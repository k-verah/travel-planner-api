import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const { method, originalUrl } = req;

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const duration = Date.now() - start;

      console.log(
        `[LOG] ${method} ${originalUrl} - Status: ${statusCode} - Time: ${duration}ms`,
      );
    });

    next();
  }
}
