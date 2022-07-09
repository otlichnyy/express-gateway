import winston from 'winston';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'production'
      ? winston.format.uncolorize()
      : winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `${String(timestamp)}: [${level}]: ${String(message)}`
    )
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
