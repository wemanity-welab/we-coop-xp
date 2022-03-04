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
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JobDomain } from '../../domain/job/job.domain';
import { JobService } from '../../domain/job/job.service';
import { JobEntity } from '../../infrastructure/job/job.entity';
@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @ApiCreatedResponse({ type: JobEntity })
  @Post()
  async create(
    @Body() job: JobDomain,
    @Res() response: Response,
  ): Promise<string | void> {
    const status = await this.jobService.create(job);
    response.status(HttpStatus.CREATED).send(status);
  }
  @ApiCreatedResponse({
    type: JobEntity,
    isArray: true,
    description: 'Table of job',
  })
  @Get()
  async getAll(@Res() response: Response): Promise<void> {
    const jobs = await this.jobService.getAll();
    response.status(HttpStatus.OK).send(jobs);
  }
  @ApiCreatedResponse({ type: JobEntity, description: 'the job' })
  @ApiNotFoundResponse()
  @Get(':id')
  async getJob(@Res() response: Response, @Param('id') jobId: number) {
    const job = await this.jobService.getJob(jobId);
    if (!job) {
      throw new NotFoundException();
    }
    return response.status(HttpStatus.OK).send(job);
  }

  @Delete(':id')
  async deleteJob(@Res() response: Response, @Param('id') jobId: number) {
    const message = await this.jobService.removeJob(jobId);
    let status = 204;

    if (message === 'Job not found') status = 404;

    response.status(status).send(message);
  }
  @Patch(':id')
  async updateJob(
    @Res() response: Response,
    @Param('id') jobId: number,
    @Body() job: JobDomain,
  ) {
    let resp;
    try {
      resp = await this.jobService.updateJob(jobId, job);
    } catch (error) {
      if (error == 'job not found') {
        console.log(error);
      }
    }

    response.status(HttpStatus.OK).send(resp);
  }
}
