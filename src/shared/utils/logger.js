// ============================================================================
// File: src/shared/utils/logger.js
// Description: Centralized structured logger for the application.
//
// Provides timestamped, leveled logging with contextual metadata.
// All modules should use this logger instead of console.log/console.error.
// ============================================================================

const levels = { error: 'ERROR', warn: 'WARN', info: 'INFO', debug: 'DEBUG' };

function formatMessage(level, context, message) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  return `[${timestamp}] [${levels[level]}] [${context}] ${message}`;
}

const logger = {
  error(context, message, meta) {
    const output = formatMessage('error', context, message);
    if (meta) console.error(output, meta);
    else console.error(output);
  },

  warn(context, message) {
    console.warn(formatMessage('warn', context, message));
  },

  info(context, message) {
    console.info(formatMessage('info', context, message));
  },

  debug(context, message) {
    if (process.env.LOG_LEVEL === 'debug') {
      console.log(formatMessage('debug', context, message));
    }
  }
};

export default logger;
