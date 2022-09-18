import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { randomUUID } from 'crypto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404);
  });

  it('GET /poll/<random-uuid>', () => {
    return request(app.getHttpServer())
      .get(`/poll/${randomUUID()}`)
      .expect(404);
  })

  it('POST /poll', async () => {
    // const agent = request(app.getHttpServer());
    return request(app.getHttpServer())
      .post('/poll')
      .send({title: "New Poll", x: ["Option A", "Option B"]})
      .expect(201);
  });
});
