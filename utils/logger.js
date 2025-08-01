import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}${stack ? `\nStack: ${stack}` : ""}`;
    })
  ),
  transports: [
    new transports.Console()
  ],
  exitOnError: false,
});

export default logger;
