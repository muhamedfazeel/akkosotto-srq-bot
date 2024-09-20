const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, label, colorize } = format;
const path = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');

class CustomLogger {
	static logDirectory = path.join(__dirname, '../../logs');

	constructor(context = 'App') {
		this.context = context;

		// Ensure log directory exists
		const logDir = CustomLogger.logDirectory;
		if (!require('fs').existsSync(logDir)) {
			require('fs').mkdirSync(logDir, { recursive: true });
		}

		// Common log format for files (without colors)
		const fileLogFormat = printf(({ timestamp, level, message, label }) => {
			return `${timestamp} [${label}] ${level}: ${message}`;
		});

		// Console log format (with colors)
		const consoleLogFormat = combine(
			colorize({ all: true }), // Colorize based on log level
			printf(({ timestamp, level, message, label }) => {
				return `${timestamp} [${label}] ${level}: ${message}`;
			})
		);

		// Create the Winston logger instance with daily rotation for each log level
		this.logger = createLogger({
			format: combine(
				label({ label: this.context }), // Add context to each log entry
				timestamp() // Add timestamp to logs
			),
			transports: [
				// Rotate info logs daily
				new DailyRotateFile({
					filename: path.join(CustomLogger.logDirectory, 'info-%DATE%.log'),
					datePattern: 'YYYY-MM-DD',
					level: 'info',
					maxFiles: '14d',
					format: fileLogFormat, // Plain format for file logs
				}),
				// Rotate warning logs daily
				new DailyRotateFile({
					filename: path.join(CustomLogger.logDirectory, 'warn-%DATE%.log'),
					datePattern: 'YYYY-MM-DD',
					level: 'warn',
					maxFiles: '14d',
					format: fileLogFormat, // Plain format for file logs
				}),
				// Rotate error logs daily
				new DailyRotateFile({
					filename: path.join(CustomLogger.logDirectory, 'error-%DATE%.log'),
					datePattern: 'YYYY-MM-DD',
					level: 'error',
					maxFiles: '30d',
					format: fileLogFormat, // Plain format for file logs
				}),
				// Console transport with colorized output
				new transports.Console({
					format: combine(
						label({ label: this.context }), // Add context to each log entry
						timestamp(),
						consoleLogFormat // Colorized format for console
					),
				}),
			],
		});
	}

	// Logging method that handles various types of input
	format(level, message) {
		let logMessage;

		if (typeof message === 'object') {
			// If the message is an object, stringify it
			logMessage = JSON.stringify(message, null, 2);
		} else {
			// For other types (number, string, etc.), convert to string if necessary
			logMessage = String(message);
		}

		this.logger.log({ level, message: logMessage });
	}

	// Shortcuts for commonly used log levels
	log(message) {
		this.format('info', message);
	}

	warn(message) {
		this.format('warn', message);
	}

	error(err) {
		this.format('error', err?.message || err);
	}
}

module.exports = CustomLogger;
