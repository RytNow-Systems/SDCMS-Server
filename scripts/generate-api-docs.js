#!/usr/bin/env node
// ============================================================================
// File: scripts/generate-api-docs.js
// Description: Reads scripts/api-manifest.yaml → generates:
//   1. Standalone HTML docs (one per collection) → docs/api/
//   2. Test data .txt files → test_data/
// Dependencies: yamljs (already in package.json)
// Usage: node scripts/generate-api-docs.js
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

/**
 * Escapes HTML special characters in a string.
 * @param {string} str - Raw string to escape.
 * @returns {string} HTML-safe string.
 */
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Applies basic JSON syntax highlighting via regex.
 * @param {string} jsonStr - The raw JSON string.
 * @returns {string} HTML with syntax-highlight spans.
 */
const highlightJson = (jsonStr) => {
  const escaped = escapeHtml(jsonStr.trim());
  return escaped
    .replace(/"([^"]+)"(\s*:)/g, '<span class="json-key">"$1"</span>$2')
    .replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
    .replace(/:\s*(true|false)/g, ': <span class="json-bool">$1</span>')
    .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>');
};

/**
 * Formats a JSON string for pretty-printing.
 * @param {string} jsonStr - The raw JSON string (may be compact).
 * @returns {string} Pretty-printed JSON string.
 */
const prettyJson = (jsonStr) => {
  try {
    return JSON.stringify(JSON.parse(jsonStr.trim()), null, 2);
  } catch {
    return jsonStr.trim();
  }
};

// ============================================================================
// HTML GENERATOR
// ============================================================================

/**
 * Generates a single endpoint card HTML block.
 * @param {object} ep - Endpoint object from the manifest.
 * @param {number} idx - Index for numbering.
 * @returns {string} HTML string for the endpoint card.
 */
const renderEndpoint = (ep, idx) => {
  const colors = METHOD_COLORS[ep.method] || METHOD_COLORS.GET;
  const authLabel = ep.auth === 'none' ? 'Public' : `Bearer {{authToken}}`;
  const rolesStr = (ep.roles || []).join(', ');

  let bodyHtml = '';
  if (ep.body) {
    const pretty = prettyJson(ep.body);
    bodyHtml = `
      <div class="section-label">Request Body</div>
      <pre class="code-block"><code>${highlightJson(pretty)}</code></pre>`;
  }

  let responseHtml = '';
  if (ep.responseBody) {
    const pretty = prettyJson(ep.responseBody);
    responseHtml = `
      <div class="section-label">Example Response <span class="status-badge">${ep.responseStatus || 200}</span></div>
      <pre class="code-block"><code>${highlightJson(pretty)}</code></pre>`;
  } else if (ep.responseStatus) {
    responseHtml = `
      <div class="section-label">Expected Status <span class="status-badge">${ep.responseStatus}</span></div>`;
  }

  let assertionsHtml = '';
  if (ep.assertions && ep.assertions.length > 0) {
    const items = ep.assertions.map((a) => `<li>${escapeHtml(a)}</li>`).join('');
    assertionsHtml = `
      <div class="section-label">Assertions</div>
      <ul class="assertion-list">${items}</ul>`;
  }

  return `
    <div class="endpoint-card" id="ep-${idx}">
      <div class="endpoint-header">
        <span class="method-badge" style="background:${colors.bg};color:${colors.text};border-color:${colors.border}">${ep.method}</span>
        <code class="endpoint-path">${escapeHtml(ep.path)}</code>
      </div>
      <h3 class="endpoint-name">${escapeHtml(ep.name)}</h3>
      <p class="endpoint-desc">${escapeHtml(ep.description || '')}</p>
      <div class="endpoint-meta">
        <span class="meta-chip" title="Authentication">${authLabel}</span>
        <span class="meta-chip" title="Roles">${rolesStr}</span>
      </div>
      ${bodyHtml}
      ${responseHtml}
      ${assertionsHtml}
    </div>`;
};

/**
 * Generates a complete standalone HTML document for a collection.
 * @param {object} collection - Collection object from manifest.
 * @param {object} info - Top-level info from manifest.
 * @returns {string} Full HTML document string.
 */
const generateCollectionHtml = (collection, info) => {
  const toc = collection.endpoints
    .map((ep, i) => `<a href="#ep-${i}" class="toc-item"><span class="method-badge-sm ${ep.method.toLowerCase()}">${ep.method}</span>${escapeHtml(ep.name)}</a>`)
    .join('');

  const cards = collection.endpoints.map((ep, i) => renderEndpoint(ep, i)).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${escapeHtml(collection.name)} — ${escapeHtml(info.title)}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    :root{--bg:#0f1117;--surface:#1a1d27;--surface2:#232736;--border:#2d3148;--text:#e2e8f0;--muted:#94a3b8;--accent:#6366f1;--accent2:#818cf8}
    body{font-family:'Inter','Segoe UI',sans-serif;background:var(--bg);color:var(--text);line-height:1.6;display:flex;min-height:100vh}
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    a{color:var(--accent2);text-decoration:none}

    /* Sidebar */
    .sidebar{width:280px;background:var(--surface);border-right:1px solid var(--border);padding:24px 16px;position:fixed;top:0;left:0;bottom:0;overflow-y:auto}
    .sidebar h1{font-size:14px;color:var(--muted);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;font-weight:600}
    .sidebar h2{font-size:18px;font-weight:700;margin-bottom:4px;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .sidebar p{font-size:13px;color:var(--muted);margin-bottom:20px;line-height:1.4}
    .toc-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;font-size:13px;color:var(--text);transition:background .15s}
    .toc-item:hover{background:var(--surface2)}

    /* Main */
    .main{margin-left:280px;padding:40px 48px;flex:1;max-width:900px}
    .main>h2{font-size:28px;font-weight:700;margin-bottom:8px}
    .main>p{color:var(--muted);margin-bottom:32px;font-size:15px}
    .endpoint-count{font-size:13px;color:var(--accent2);margin-bottom:32px;display:block}

    /* Cards */
    .endpoint-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:20px;transition:border-color .2s}
    .endpoint-card:hover{border-color:var(--accent)}
    .endpoint-header{display:flex;align-items:center;gap:10px;margin-bottom:10px}
    .method-badge{padding:4px 10px;border-radius:6px;font-size:12px;font-weight:700;font-family:'JetBrains Mono',monospace;border:1px solid;letter-spacing:.5px}
    .method-badge-sm{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:700;font-family:'JetBrains Mono',monospace}
    .method-badge-sm.get{background:#064e3b;color:#34d399}
    .method-badge-sm.post{background:#1e3a5f;color:#60a5fa}
    .method-badge-sm.put{background:#78350f;color:#fbbf24}
    .method-badge-sm.patch{background:#4c1d95;color:#a78bfa}
    .method-badge-sm.delete{background:#7f1d1d;color:#f87171}
    .endpoint-path{font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--text);background:var(--surface2);padding:4px 8px;border-radius:4px}
    .endpoint-name{font-size:18px;font-weight:600;margin-bottom:6px}
    .endpoint-desc{color:var(--muted);font-size:14px;margin-bottom:12px}
    .endpoint-meta{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}
    .meta-chip{font-size:11px;padding:4px 10px;background:var(--surface2);border:1px solid var(--border);border-radius:20px;color:var(--muted)}

    /* Code */
    .section-label{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:8px;margin-top:16px;display:flex;align-items:center;gap:8px}
    .status-badge{background:var(--accent);color:white;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700}
    .code-block{background:#141720;border:1px solid var(--border);border-radius:8px;padding:16px;overflow-x:auto;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.5;white-space:pre-wrap;word-break:break-word}
    .json-key{color:#93c5fd}
    .json-string{color:#86efac}
    .json-number{color:#fbbf24}
    .json-bool{color:#c084fc}
    .json-null{color:#f87171}

    /* Assertions */
    .assertion-list{list-style:none;padding:0}
    .assertion-list li{padding:6px 0 6px 20px;position:relative;font-size:13px;color:var(--muted)}
    .assertion-list li::before{content:'✓';position:absolute;left:0;color:#34d399;font-weight:700}

    /* Responsive */
    @media(max-width:768px){.sidebar{display:none}.main{margin-left:0;padding:20px}}

    /* Footer */
    .footer{text-align:center;padding:32px;color:var(--muted);font-size:12px;border-top:1px solid var(--border);margin-top:40px}
  </style>
</head>
<body>
  <nav class="sidebar">
    <h1>${escapeHtml(info.title)}</h1>
    <h2>${escapeHtml(collection.name)}</h2>
    <p>${escapeHtml(collection.description || '')}</p>
    ${toc}
  </nav>
  <main class="main">
    <h2>${escapeHtml(collection.name)}</h2>
    <p>${escapeHtml(collection.description || '')}</p>
    <span class="endpoint-count">${collection.endpoints.length} endpoint${collection.endpoints.length > 1 ? 's' : ''}</span>
    ${cards}
    <div class="footer">
      Generated from api-manifest.yaml — ${new Date().toISOString().split('T')[0]} — ${escapeHtml(info.title)} v${info.version}
    </div>
  </main>
</body>
</html>`;
};

// ============================================================================
// TEST DATA GENERATOR
// ============================================================================

/**
 * Generates a test data .txt file for a collection.
 * @param {object} collection - Collection object from manifest.
 * @returns {string} Plain-text test data content.
 */
const generateTestData = (collection) => {
  const sep = '='.repeat(50);
  const lines = [
    sep,
    `${collection.name.toUpperCase()} — Test Data`,
    `Generated from api-manifest.yaml`,
    sep,
    '',
  ];

  collection.endpoints.forEach((ep, i) => {
    lines.push(`--- TEST ${i + 1}: ${ep.name} ---`);
    lines.push(`Method: ${ep.method}`);
    lines.push(`URL: /api/v1${ep.path}`);

    const authLabel = ep.auth === 'none' ? 'None' : 'Bearer <TOKEN>';
    lines.push(`Auth: ${authLabel}`);

    if (ep.roles) {
      lines.push(`Roles: ${ep.roles.join(', ')}`);
    }

    if (ep.headers) {
      const hdrs = Object.entries(ep.headers)
        .map(([k, v]) => `  ${k}: ${v}`)
        .join('\n');
      lines.push(`Headers:\n${hdrs}`);
    }

    if (ep.body) {
      const pretty = prettyJson(ep.body);
      lines.push(`\nBody:\n${pretty}`);
    }

    lines.push(`\nExpected Status: ${ep.responseStatus || 200}`);

    if (ep.assertions && ep.assertions.length > 0) {
      lines.push('Assertions:');
      ep.assertions.forEach((a, j) => {
        lines.push(`  ${j + 1}. ${a}`);
      });
    }

    lines.push('');
  });

  return lines.join('\n');
};

// ============================================================================
// FILENAME HELPERS
// ============================================================================

/**
 * Maps a collection slug to the corresponding test data filename.
 * Maintains backwards compatibility with existing file names.
 * @param {string} slug - Collection slug from manifest.
 * @param {string} name - Collection display name.
 * @returns {string} Test data filename.
 */
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

// Ensure output directories exist
fs.mkdirSync(docsDir, { recursive: true });
fs.mkdirSync(testDataDir, { recursive: true });

let htmlCount = 0;
let txtCount = 0;

for (const collection of manifest.collections) {
  // --- HTML doc ---
  const htmlFilename = `${collection.slug}-documentation.html`;
  const htmlPath = path.join(docsDir, htmlFilename);
  const htmlContent = generateCollectionHtml(collection, manifest.info);
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  htmlCount++;

  // --- Test data ---
  const txtFilename = testDataFilename(collection.slug, collection.name);
  const txtPath = path.join(testDataDir, txtFilename);
  const txtContent = generateTestData(collection);
  fs.writeFileSync(txtPath, txtContent, 'utf8');
  txtCount++;
}

console.log(`\n✅ API Documentation Generated Successfully`);
console.log(`   HTML docs: ${htmlCount} files → docs/api/`);
console.log(`   Test data: ${txtCount} files → test_data/\n`);
