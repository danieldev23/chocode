import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('API For My Production')
    .setDescription('My Production API: http://localhost:3000/swagger/json')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.enableCors({
    origin: [process.env.FRONTEND_REDIRECT_URL],
    credentials: true,
  });
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
