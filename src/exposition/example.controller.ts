import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { ExampleModel } from '../domain/models/example.model';
import { ExampleService } from '../domain/services/example.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  create(@Body() example: ExampleModel, @Res() response: Response): string|void {
    const status = this.exampleService.create(new ExampleModel(example.description));
    response.status(HttpStatus.CREATED).send(status);
  }
  @Get()
  async getAll(@Res() response: Response) {
    const examples = await this.exampleService.getAll();
    response.status(HttpStatus.OK).send(examples);
  }

}