import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PollDto, PollResponseDto } from './poll.controller';
import { Poll } from './poll.interface';
import { PollResponse } from './pollresponse.interface';

@Injectable()
export class PollService {
  private readonly polls: Poll[] = [];

  create({title, description, x, y}: PollDto): string {
    const id = randomUUID();
    this.polls.push({title, description, id, x, y, responses: []});
    return id;
  }

  findAll(): Poll[] {
    return this.polls;
  }

  find(id: string): Poll {
    const poll = this.polls.find((poll) => poll.id === id)
    if(!poll) {
        throw new NotFoundException(`No poll with id ${id}`);
    }
    return poll;
  }

  addResponse(id: string, response: PollResponseDto) {
    const poll = this.find(id);
    poll.responses.push(response as PollResponse)
  }
}
