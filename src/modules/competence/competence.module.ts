import { Module } from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CompetenceController } from './competence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competence } from './entities/competence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Competence])],
  controllers: [CompetenceController],
  providers: [CompetenceService],
})
export class CompetenceModule {}
