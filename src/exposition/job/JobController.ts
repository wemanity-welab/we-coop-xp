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
  NotFoundException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JobDomain } from '../../domain/job/JobDomain';
import { JobEntity } from '../../infrastructure/job/JobEntity';
import { JobServiceAdapter } from './JobServiceAdapter';
@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobServiceAdapter: JobServiceAdapter) {}
  @ApiCreatedResponse({ type: JobEntity })
  @Post()
  async create(
    @Body() job: JobDomain,
    @Res() response: Response,
  ): Promise<string | void> {
    const status = await this.jobServiceAdapter.save(job);
    response.status(HttpStatus.CREATED).send(status);
  }
  @ApiCreatedResponse({
    type: JobEntity,
    isArray: true,
    description: 'Table of job',
  })
  @Get()
  async getAll(@Res() response: Response): Promise<void> {
    const jobs = await this.jobServiceAdapter.getAll();
    response.status(HttpStatus.OK).send(jobs);
  }
  @ApiCreatedResponse({ type: JobEntity, description: 'the job' })
  @ApiNotFoundResponse()
  @Get(':id')
  async getJob(@Res() response: Response, @Param('id') jobId: number) {
    const job = await this.jobServiceAdapter.getJob(jobId);
    if (!job) {
      throw new NotFoundException();
    }
    return response.status(HttpStatus.OK).send(job);
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
