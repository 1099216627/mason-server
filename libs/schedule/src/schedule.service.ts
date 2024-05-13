import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    // 定时任务，可以在这里同步数据或清除日志等操作
    console.log('Hello');
  }
}
