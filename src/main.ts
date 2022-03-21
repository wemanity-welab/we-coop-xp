import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
import { AppModule } from './modules/app.module';
=======
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
>>>>>>> swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('JOB API')
    .setDescription('CRUD JOB')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(8080);
}
bootstrap();
