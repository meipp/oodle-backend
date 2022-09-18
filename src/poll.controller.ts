import { Body, Controller, Get, HttpCode, Logger, Param, Post, UsePipes } from '@nestjs/common';
import { Poll } from './poll.interface';
import { PollService } from './poll.service';
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const PollResponseSchema = z.object({
    name: z.string(),
    selections: z.array(z.object({
        x: z.string(),
        y: z.string().optional(),
        selection: z.enum(["yes", "no", "unknown"]),
    })).nonempty(),
});
export class PollResponseDto extends createZodDto(PollResponseSchema) {}

const PollSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  x: z.array(z.string()).nonempty(),
  y: z.array(z.string()).nonempty().optional(),
});
export class PollDto extends createZodDto(PollSchema) {}

@Controller("poll")
export class PollController {
  constructor(private pollService: PollService) {}

  @Post()
  create(@Body() poll: PollDto): string {
    Logger.log(`POST ${JSON.stringify(poll)}`);
    return this.pollService.create(poll);
  }

  @Get()
  findAll(): Poll[] {
    return this.pollService.findAll();
  }

  @Get(":id")
  getPoll(@Param() params): Poll {
    return this.pollService.find(params.id);
  }

  @Post("respond/:id")
  @HttpCode(200)
  addResponse(@Param() params, @Body() response: PollResponseDto) {
    this.pollService.addResponse(params.id, response);
  }
}
