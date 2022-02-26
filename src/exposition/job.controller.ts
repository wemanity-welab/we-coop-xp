import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  Delete,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JobModel } from '../domain/models/job.model';
import { JobService } from '../domain/services/job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async create(@Body() job: JobModel, @Res() response: Response): Promise<string | void> {
    const status = await this.jobService.create(new JobModel(job));
    response.status(HttpStatus.CREATED).send(status);
  }
  @Get()
  async getAll(@Res() response: Response) {
    const jobs = await this.jobService.getAll();
    response.status(HttpStatus.OK).send(jobs);
  }

  @Delete(':id')
  async deleteJob(@Res() response: Response, @Param('id') jobId: number) {
    const message = await this.jobService.removeJob(jobId);
    let status = 204;

    if (message === 'Job not found') status = 404;

    response.status(status).send(message);
  }
}
