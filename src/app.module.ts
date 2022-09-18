import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { ZodValidationPipe } from 'nestjs-zod'

@Module({
  imports: [],
  controllers: [PollController],
  providers: [PollService, {provide: APP_PIPE, useClass: ZodValidationPipe}],
})
export class AppModule {}
