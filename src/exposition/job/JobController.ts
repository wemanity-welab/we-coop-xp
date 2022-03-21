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
<<<<<<< HEAD:src/exposition/job/JobController.ts
import { JobDomain } from '../../domain/job/JobDomain';
import { JobServiceAdapter } from './JobServiceAdapter';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobServiceAdapter: JobServiceAdapter) {}

=======
import { JobDomain } from '../../domain/job/job.domain';
import { JobService } from '../../domain/job/job.service';
import { JobEntity } from '../../infrastructure/job/job.entity';
@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @ApiCreatedResponse({ type: JobEntity })
>>>>>>> swagger:src/exposition/job/job.controller.ts
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
<<<<<<< HEAD:src/exposition/job/JobController.ts
  async getAll(@Res() response: Response) {
    const jobs = await this.jobServiceAdapter.getAll();
=======
  async getAll(@Res() response: Response): Promise<void> {
    const jobs = await this.jobService.getAll();
>>>>>>> swagger:src/exposition/job/job.controller.ts
    response.status(HttpStatus.OK).send(jobs);
  }
  @ApiCreatedResponse({ type: JobEntity, description: 'the job' })
  @ApiNotFoundResponse()
  @Get(':id')
  async getJob(@Res() response: Response, @Param('id') jobId: number) {
<<<<<<< HEAD:src/exposition/job/JobController.ts
    const message = await this.jobServiceAdapter.getJob(jobId);

    response.status(HttpStatus.OK).send(message);
=======
    const job = await this.jobService.getJob(jobId);
    if (!job) {
      throw new NotFoundException();
    }
    return response.status(HttpStatus.OK).send(job);
>>>>>>> swagger:src/exposition/job/job.controller.ts
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
