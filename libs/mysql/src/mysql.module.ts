import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competence } from 'src/modules/competence/entities/competence.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('db.host'),
          port: configService.get('db.port'),
          username: configService.get('db.username'),
          password: configService.get('db.password'),
          database: configService.get('db.database'),
          entities: [User, Role, Competence],
          poolSize: 10,
          connectorPackage: 'mysql2',
          synchronize: true,
          extra: {
            authPlugins: 'sha256_password',
          },
        };
      },
    }),
  ],
})
export class MysqlModule {}
