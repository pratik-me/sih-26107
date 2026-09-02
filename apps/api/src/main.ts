import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false
    })
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger OpenAPI Setup
  const config = new DocumentBuilder()
    .setTitle('BIS IntelliGuide API')
    .setDescription('AI-Powered Intelligent Assistant for Indian Standards and Bureau of Indian Standards (BIS) Services')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Authentication')
    .addTag('Indian Standards')
    .addTag('Certification')
    .addTag('Testing Requirements')
    .addTag('Laboratories')
    .addTag('Hallmarking')
    .addTag('Consumer Protection')
    .addTag('Chat & AI Assistant')
    .addTag('RAG Retrieval')
    .addTag('Compliance Reports')
    .addTag('Analytics')
    .addTag('Admin')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 BIS IntelliGuide API running on http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger documentation available at http://localhost:${port}/api/docs`);
}

bootstrap();
