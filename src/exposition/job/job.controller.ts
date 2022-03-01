import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { JobDomain } from '../../domain/job/job.domain';
import { JobService } from '../../domain/job/job.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async create(
    @Body() job: JobDomain,
    @Res() response: Response,
  ): Promise<string | void> {
    const status = await this.jobService.create(job);
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
  @Put(':id')
  async updateJob(
    @Res() response: Response,
    @Param('id') jobId: number,
    @Body() job: JobDomain,
  ) {
    let status = HttpStatus.OK;
    let resp;
    try {
      resp = await this.jobService.updateJob(jobId, job);
    } catch (error) {
      if (error == 'job not found') {
        status = HttpStatus.BAD_REQUEST;
      }
    }

    resp.status(status).send(resp);
  }
}
