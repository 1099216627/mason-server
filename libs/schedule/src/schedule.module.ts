import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleModule as ScheduleLibModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleLibModule.forRoot()],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
