// middleware/request-logging.ts
import { Logger } from '@nestjs/common';
import morgan, { format } from 'morgan';

export function useRequestLogging(app) {
  const logger = new Logger('Request');
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => logger.log(message.replace('\n', '')),
      },
    }),
  );
}
