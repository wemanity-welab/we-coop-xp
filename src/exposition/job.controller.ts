import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JobModel } from '../domain/models/job.model';
import { JobService } from '../domain/services/job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() job: JobModel, @Res() response: Response): string | void {
    const status = this.jobService.create(new JobModel(job));
    response.status(HttpStatus.CREATED).send(status);
  }
  @Get()
  async getAll(@Res() response: Response) {
    const jobs = await this.jobService.getAll();
    response.status(HttpStatus.OK).send(jobs);
  }
}
