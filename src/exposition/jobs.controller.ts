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
import { JobsModel } from '../domain/models/jobs.model';
import { JobsService } from '../domain/services/jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() job: JobsModel, @Res() response: Response): string | void {
    const status = this.jobsService.create(new JobsModel(job));
    response.status(HttpStatus.CREATED).send(status);
  }
  @Get()
  async getAll(@Res() response: Response) {
    const jobs = await this.jobsService.getAll();
    response.status(HttpStatus.OK).send(jobs);
  }
}
