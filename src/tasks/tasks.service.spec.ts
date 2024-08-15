import { Test, TestingModule } from '@nestjs/testing';
import { TasksServiceImpl } from './tasks.service.impl';

describe('TasksService', () => {
  let service: TasksServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksServiceImpl],
    }).compile();

    service = module.get<TasksServiceImpl>(TasksServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
