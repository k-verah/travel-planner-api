import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // VALIDACIÓN GLOBAL
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,   // elimina campos no permitidos
      forbidNonWhitelisted: true, // lanza error si envían campos extra
      transform: true,   // convierte automáticamente tipos del DTO
    }),
  );

  await app.listen(3000);
  console.log('API running on port 3000');
}
bootstrap();
