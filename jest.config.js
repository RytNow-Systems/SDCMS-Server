// ============================================================================
// Jest Configuration for SDCMS Backend
// Supports ESM via --experimental-vm-modules Node flag.
// ============================================================================

export default {
  testEnvironment: 'node',
  transform: {},
  // Increase timeout for E2E tests (mock DB init can take time)
  testTimeout: 15000,
};
