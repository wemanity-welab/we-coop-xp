import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { JobDomain } from '../../domain/job/JobDomain';
import { JobServiceAdapter } from './JobServiceAdapter';

@Controller('jobs')
export class JobApi {
  constructor(private readonly jobServiceAdapter: JobServiceAdapter) {}

  @Post()
  async create(
    @Body() job: JobDomain,
    @Res() response: Response,
  ): Promise<string | void> {
    const status = await this.jobServiceAdapter.save(job);
    response.status(HttpStatus.CREATED).send(status);
  }
  @Get()
  async getAll(@Res() response: Response) {
    const jobs = await this.jobServiceAdapter.getAll();
    response.status(HttpStatus.OK).send(jobs);
  }
  @Get(':id')
  async getJob(@Res() response: Response, @Param('id') jobId: number) {
    const message = await this.jobServiceAdapter.getJob(jobId);

    response.status(HttpStatus.OK).send(message);
  }

  @Delete(':id')
  async deleteJob(@Res() response: Response, @Param('id') jobId: number) {
    const message = await this.jobServiceAdapter.remove(jobId);

    response.status(HttpStatus.ACCEPTED).send(message);
  }
  @Patch(':id')
  async updateJob(
    @Res() response: Response,
    @Param('id') jobId: number,
    @Body() job: JobDomain,
  ) {
    let resp;
    try {
      resp = await this.jobServiceAdapter.update(jobId, job);
    } catch (error) {
      if (error == 'job not found') {
        console.log(error);
      }
    }

    response.status(HttpStatus.OK).send(resp);
  }
}
