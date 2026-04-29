#!/usr/bin/env node
// ============================================================================
// File: scripts/generate-api-docs.js
// Description: Reads scripts/api-manifest.yaml → generates:
//   1. Premium HTML documentation (docs/api/)
//   2. Test data .txt files (test_data/)
// ============================================================================

import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ============================================================================
// LOAD MANIFEST
// ============================================================================
const manifestPath = path.join(__dirname, 'api-manifest.yaml');
const manifest = YAML.load(manifestPath);

// ============================================================================
// HELPERS
// ============================================================================
const METHOD_COLORS = {
  GET: { bg: '#064e3b', text: '#34d399', border: '#065f46' },
  POST: { bg: '#1e3a5f', text: '#60a5fa', border: '#1e40af' },
  PUT: { bg: '#78350f', text: '#fbbf24', border: '#92400e' },
  PATCH: { bg: '#4c1d95', text: '#a78bfa', border: '#5b21b6' },
  DELETE: { bg: '#7f1d1d', text: '#f87171', border: '#991b1b' },
};

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const highlightJson = (jsonStr) => {
  const escaped = escapeHtml(jsonStr.trim());
  return escaped
    .replace(/"([^"]+)"(\s*:)/g, '<span class="json-key">"$1"</span>$2')
    .replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span class="json-bool">$1</span>')
    .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>');
};

const prettyJson = (jsonStr) => {
  try {
    return JSON.stringify(JSON.parse(jsonStr.trim()), null, 2);
  } catch {
    return jsonStr.trim();
  }
};

const generateCurl = (ep, baseUrl) => {
  let curl = `curl -X ${ep.method} "${baseUrl}${ep.path}" \\\n`;
  if (ep.auth !== 'none') {
    curl += `  -H "Authorization: Bearer {{authToken}}" \\\n`;
  }
  if (ep.headers) {
    Object.entries(ep.headers).forEach(([k, v]) => {
      curl += `  -H "${k}: ${v}" \\\n`;
    });
  }
  if (ep.body) {
    try {
      const compactBody = JSON.stringify(JSON.parse(ep.body.trim()));
      curl += `  -d '${compactBody}'`;
    } catch {
       curl += `  -d '${ep.body.trim()}'`;
    }
  }
  return curl.trim().replace(/\\\n$/, '');
};

// ============================================================================
// HTML GENERATOR
// ============================================================================

const renderEndpoint = (ep, idx, baseUrl) => {
  const colors = METHOD_COLORS[ep.method] || METHOD_COLORS.GET;
  const authLabel = ep.auth === 'none' ? 'Public' : `Bearer Token`;
  const rolesStr = (ep.roles || []).join(', ');
  const curlCmd = generateCurl(ep, baseUrl);

  let bodyHtml = '';
  if (ep.body) {
    const pretty = prettyJson(ep.body);
    bodyHtml = `
      <div class="section-group">
        <div class="section-label">Request Body</div>
        <pre class="code-block"><code>${highlightJson(pretty)}</code></pre>
      </div>`;
  }

  let responseHtml = '';
  if (ep.responseBody) {
    const pretty = prettyJson(ep.responseBody);
    responseHtml = `
      <div class="section-group">
        <div class="section-label">Example Response <span class="status-badge">${ep.responseStatus || 200}</span></div>
        <pre class="code-block"><code>${highlightJson(pretty)}</code></pre>
      </div>`;
  } else if (ep.responseStatus) {
    responseHtml = `
      <div class="section-group">
        <div class="section-label">Expected Status <span class="status-badge">${ep.responseStatus}</span></div>
      </div>`;
  }

  let notesHtml = '';
  if (ep.notes) {
    notesHtml = `
      <div class="note-box">
        <span class="note-icon">💡</span>
        <div class="note-content">
          <strong>Developer Note:</strong> ${escapeHtml(ep.notes)}
        </div>
      </div>`;
  }

  return `
    <div class="endpoint-card" id="ep-${idx}">
      <div class="endpoint-info">
        <div class="endpoint-header">
          <span class="method-badge" style="background:${colors.bg};color:${colors.text};border-color:${colors.border}">${ep.method}</span>
          <code class="endpoint-path">${escapeHtml(ep.path)}</code>
        </div>
        <h3 class="endpoint-name">${escapeHtml(ep.name)}</h3>
        <p class="endpoint-desc">${escapeHtml(ep.description || '')}</p>
        
        ${notesHtml}
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Authentication</span>
              <span class="meta-value">${authLabel}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Permissions</span>
              <span class="meta-value">${rolesStr}</span>
            </div>
          </div>

        ${ep.parameters ? `
          <div class="section-label">Parameters</div>
          <table class="params-table">
            <thead>
              <tr><th>Name</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
              ${Object.entries(ep.parameters).map(([k, v]) => `
                <tr>
                  <td><code>${k}</code></td>
                  <td><span class="type-tag">${v.type || 'string'}</span></td>
                  <td>${v.description || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : ''}
      </div>

      <div class="endpoint-example">
        <div class="section-label">cURL Example</div>
        <pre class="code-block curl-block"><code>${escapeHtml(curlCmd)}</code></pre>
        ${bodyHtml}
        ${responseHtml}
      </div>
    </div>`;
};

const generateCollectionHtml = (collection, info) => {
  const toc = collection.endpoints
    .map((ep, i) => `<a href="#ep-${i}" class="toc-item"><span class="method-badge-sm ${ep.method.toLowerCase()}">${ep.method}</span>${escapeHtml(ep.name)}</a>`)
    .join('');

  const baseUrl = info.baseUrl || 'http://localhost:5000/api/v1';
  const cards = collection.endpoints.map((ep, i) => renderEndpoint(ep, i, baseUrl)).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escapeHtml(collection.name)} — SDCMS API</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap">
  <style>
    :root {
      --bg: #0b0e14;
      --sidebar-bg: #11141d;
      --card-bg: #161a23;
      --border: #232834;
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.15);
      --code-bg: #0d1117;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text-main); line-height: 1.6; }
    
    /* Layout */
    .container { display: flex; min-height: 100vh; }
    
    /* Sidebar */
    .sidebar { 
      width: 300px; 
      background: var(--sidebar-bg); 
      border-right: 1px solid var(--border); 
      padding: 32px 16px; 
      position: fixed; 
      height: 100vh; 
      overflow-y: auto; 
    }
    .sidebar-header { margin-bottom: 32px; padding: 0 12px; }
    .sidebar-header h1 { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
    .sidebar-header h2 { font-size: 20px; font-weight: 700; color: white; }
    
    .toc-list { display: flex; flex-direction: column; gap: 4px; }
    .toc-item { 
      display: flex; align-items: center; gap: 12px; padding: 10px 12px; 
      border-radius: 8px; font-size: 13px; color: var(--text-muted); 
      text-decoration: none; transition: all 0.2s; 
    }
    .toc-item:hover { background: var(--card-bg); color: white; }
    .toc-item.active { background: var(--accent-glow); color: var(--accent); border-left: 2px solid var(--accent); }

    /* Main Content */
    .main { margin-left: 300px; padding: 64px 48px; width: 100%; max-width: 1400px; }
    .main-header { margin-bottom: 48px; max-width: 800px; }
    .main-header h2 { font-size: 32px; font-weight: 700; margin-bottom: 12px; color: white; }
    .main-header p { font-size: 16px; color: var(--text-muted); margin-bottom: 24px; }

    /* Guide Box */
    .guide-box { 
      background: var(--card-bg); border: 1px solid var(--accent); 
      border-radius: 12px; padding: 24px; margin-bottom: 48px; 
      max-width: 800px; position: relative; overflow: hidden;
    }
    .guide-box::before { 
      content: ''; position: absolute; top: 0; left: 0; width: 4px; 
      height: 100%; background: var(--accent); 
    }
    .guide-box h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 12px; }
    .guide-box p { font-size: 14px; color: var(--text-main); margin-bottom: 0; }

    /* Note Box */
    .note-box { 
      background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.3); 
      border-radius: 8px; padding: 16px; margin-bottom: 24px; 
      display: flex; gap: 12px; align-items: flex-start;
    }
    .note-icon { font-size: 18px; }
    .note-content { font-size: 13px; color: #fbbf24; }
    .note-content strong { color: #fcd34d; display: block; margin-bottom: 2px; }

    /* Endpoint Cards */
    .endpoint-card { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      padding: 48px 0; 
      border-bottom: 1px solid var(--border); 
    }
    .endpoint-card:last-child { border-bottom: none; }
    
    .endpoint-info { max-width: 600px; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .method-badge { 
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; 
      font-family: 'JetBrains Mono', monospace; border: 1px solid; 
    }
    .method-badge-sm { width: 45px; text-align: center; font-size: 9px; font-weight: 800; padding: 2px 4px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }
    .method-badge-sm.get { background: #064e3b; color: #34d399; }
    .method-badge-sm.post { background: #1e3a5f; color: #60a5fa; }
    .method-badge-sm.put { background: #78350f; color: #fbbf24; }
    .method-badge-sm.patch { background: #4c1d95; color: #a78bfa; }
    .method-badge-sm.delete { background: #7f1d1d; color: #f87171; }

    .endpoint-path { font-family: 'JetBrains Mono', monospace; color: var(--text-muted); font-size: 13px; }
    .endpoint-name { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: white; }
    .endpoint-desc { font-size: 14px; color: var(--text-muted); margin-bottom: 24px; }

    /* Meta Grid */
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
    .meta-item { background: var(--card-bg); padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); }
    .meta-label { display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 4px; }
    .meta-value { font-size: 13px; font-weight: 600; color: var(--text-main); }

    /* Tables */
    .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; color: var(--text-muted); margin-bottom: 12px; margin-top: 24px; }
    .params-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    .params-table th { text-align: left; padding: 12px; font-size: 12px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    .params-table td { padding: 12px; font-size: 13px; border-bottom: 1px solid var(--border); }
    .type-tag { font-size: 10px; background: var(--border); padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; }

    /* Code Blocks */
    .endpoint-example { align-self: start; }
    .code-block { background: var(--code-bg); border-radius: 12px; border: 1px solid var(--border); padding: 20px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
    .curl-block { color: #818cf8; }
    .json-key { color: #93c5fd; }
    .json-string { color: #86efac; }
    .json-number { color: #fbbf24; }
    .json-bool { color: #c084fc; }
    .json-null { color: #f87171; }
    .status-badge { background: #059669; color: white; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 700; margin-left: 8px; }

    /* Sidebar Toggle Button */
    .sidebar-toggle {
      display: none; position: fixed; top: 16px; left: 16px; z-index: 1001;
      background: var(--accent); color: white; border: none; border-radius: 8px;
      width: 40px; height: 40px; font-size: 20px; cursor: pointer;
      align-items: center; justify-content: center; box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .sidebar-overlay {
      display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
    }

    @media (max-width: 1100px) {
      .sidebar { display: none; position: fixed; z-index: 1000; }
      .sidebar.open { display: block; }
      .sidebar-toggle { display: flex; }
      .sidebar-overlay.open { display: block; }
      .main { margin-left: 0; padding: 32px 20px; }
      .endpoint-card { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">&#9776;</button>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>
  <div class="container">
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <h1>SDCMS Backend API</h1>
        <h2>${escapeHtml(collection.name)}</h2>
      </div>
      <div class="toc-list">${toc}</div>
    </nav>
    <main class="main">
      <header class="main-header">
        <h2>${escapeHtml(collection.name)}</h2>
        <p>${escapeHtml(collection.description || '')}</p>
      </header>

      ${collection.guide ? `
        <div class="guide-box">
          <h4>Integration Guide</h4>
          <p>${escapeHtml(collection.guide)}</p>
        </div>
      ` : ''}

      ${cards}
      <footer style="margin-top: 80px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 12px; text-align: center;">
        Generated from api-manifest.yaml — v${info.version} — ${new Date().toISOString().split('T')[0]}
      </footer>
    </main>
  </div>
  <script>
    // Sidebar toggle (mobile)
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('open'); };
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);

    // TOC active state via IntersectionObserver
    const tocLinks = document.querySelectorAll('.toc-item');
    const cards = document.querySelectorAll('.endpoint-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((l) => l.classList.remove('active'));
          const link = document.querySelector('.toc-item[href="#' + entry.target.id + '"]');
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
    cards.forEach((card) => observer.observe(card));

    // Close sidebar on TOC link click (mobile)
    tocLinks.forEach((l) => l.addEventListener('click', closeSidebar));
  </script>
</body>
</html>`;
};

// ============================================================================
// TEST DATA GENERATOR
// ============================================================================

const generateTestData = (collection) => {
  const sep = '='.repeat(50);
  const lines = [sep, `${collection.name.toUpperCase()} — Test Data`, `Generated from api-manifest.yaml`, sep, ''];

  collection.endpoints.forEach((ep, i) => {
    lines.push(`--- TEST ${i + 1}: ${ep.name} ---`);
    lines.push(`Method: ${ep.method}`);
    lines.push(`URL: /api/v1${ep.path}`);
    lines.push(`Auth: ${ep.auth === 'none' ? 'None' : 'Bearer <TOKEN>'}`);
    if (ep.roles) lines.push(`Roles: ${ep.roles.join(', ')}`);
    if (ep.headers) {
      lines.push(`Headers:`);
      Object.entries(ep.headers).forEach(([k, v]) => lines.push(`  ${k}: ${v}`));
    }
    if (ep.body) lines.push(`\nBody:\n${prettyJson(ep.body)}`);
    lines.push(`\nExpected Status: ${ep.responseStatus || 200}\n`);
  });

  return lines.join('\n');
};

const testDataFilename = (slug, name) => {
  const map = {
    'authentication': 'Auth_Test_Data.txt',
    'product-catalog': 'Product_Test_Data.txt',
    'employee-management': 'Employee_Test_Data.txt',
    'courier-partners': 'Courier_Test_Data.txt',
    'senders': 'Sender_Test_Data.txt',
    'receivers': 'ReceiverLookup_Test_Data.txt',
    'order-pipeline': 'Order_Test_Data.txt',
    'parcels-retrieval': 'Parcel_Test_Data.txt',
    'label-print': 'LabelPrint_Test_Data.txt',
    'scan-operations': 'Scan_Test_Data.txt',
    'dispatch-terminal': 'Dispatch_Test_Data.txt',
    'parcel-events': 'ParcelEvents_Test_Data.txt',
    'dashboard': 'Dashboard_Test_Data.txt',
    'bulk-upload': 'BulkUpload_Test_Data.txt',
    'notification': 'Notification_Test_Data.txt',
  };
  return map[slug] || `${name.replace(/\s+/g, '_')}_Test_Data.txt`;
};

// ============================================================================
// MAIN
// ============================================================================

const docsDir = path.join(ROOT, 'docs', 'api');
const testDataDir = path.join(ROOT, 'test_data');

fs.mkdirSync(docsDir, { recursive: true });
fs.mkdirSync(testDataDir, { recursive: true });

for (const collection of manifest.collections) {
  const htmlPath = path.join(docsDir, `${collection.slug}-documentation.html`);
  fs.writeFileSync(htmlPath, generateCollectionHtml(collection, manifest.info), 'utf8');

  const txtPath = path.join(testDataDir, testDataFilename(collection.slug, collection.name));
  fs.writeFileSync(txtPath, generateTestData(collection), 'utf8');
}

console.log(`\n✅ API Documentation & Test Data Generated Successfully\n`);
