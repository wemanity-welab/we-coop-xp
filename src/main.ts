import { NestFactory } from '@nestjs/core';
import { AppModule } from './exposition/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
