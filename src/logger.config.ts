import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import 'winston-daily-rotate-file';
// const IsProMode = process.env.NODE_ENV === 'production';
const IsProMode = true;

const format = (label?: string) => {
  switch (label) {
    case 'isDev':
      return {
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('nestBk', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      };
    default:
      return {
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
        ),
      };
  }
};
const prodLoggerConfig = [
  new winston.transports.DailyRotateFile({
    level: 'warn',
    filename: 'nestBk-%DATE%.log',
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d',
    zippedArchive: true,
    ...format(),
  }),
  new winston.transports.DailyRotateFile({
    level: 'info',
    filename: 'info-%DATE%.log',
    dirname: 'logs',
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '14d',
    zippedArchive: true,
    ...format(),
  }),
];

export const loggerOptions = {
  transports: [
    new winston.transports.Console({
      level: 'info',
      ...format('isDev'),
    }),
    ...(IsProMode ? prodLoggerConfig : []),
  ],
};
