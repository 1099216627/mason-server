import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './modules/roles/roles.module';
import { CompetenceModule } from './modules/competence/competence.module';
import configuration from '../config/configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import { ScheduleModule } from '@app/schedule';
import { MysqlModule } from '@app/mysql';
import { OssModule } from '@app/oss';
import { UploadModule } from './modules/upload/upload.module';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MysqlModule,
    ScheduleModule,
    OssModule,
    UsersModule,
    RolesModule,
    CompetenceModule,
    UploadModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
