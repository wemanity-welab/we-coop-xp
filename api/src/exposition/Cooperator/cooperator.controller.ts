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
  HttpException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CooperatorDomain } from '../../domain/Cooperator/cooperator.domain';
import { CooperatorEntity } from '../../infrastructure/Cooperator/cooperator.entity';
import { Cooperator } from '../../types/Cooperator';
import { CooperatorServiceAdapter } from './cooperator.service.adapter';

@ApiTags('cooperators')
@Controller('cooperators')
export class CooperatorController {
  constructor(
    private readonly cooperatorServiceAdapter: CooperatorServiceAdapter,
  ) {}
  @ApiCreatedResponse({ type: CooperatorEntity })
  @Post()
  async create(
    @Body() cooperator: Cooperator,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const cooperatorProperties = Object.values(cooperator);

      cooperatorProperties.map((property) => {
        if (property === '') {
          throw new HttpException(
            'Tous les champs doivent être renseignés',
            HttpStatus.BAD_REQUEST,
          );
        }
      });

      const newCooperator = await this.cooperatorServiceAdapter.save(
        cooperator,
      );

      response.status(HttpStatus.CREATED).send(newCooperator);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @ApiCreatedResponse({
    type: CooperatorEntity,
    isArray: true,
    description: 'Table of cooperators',
  })
  @Get()
  async getAll(@Res() response: Response): Promise<void> {
    try {
      const cooperators = await this.cooperatorServiceAdapter.getAll();
      response.status(HttpStatus.OK).send(cooperators);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @Get('search')
  async search(@Query('criteria') search: string[]) {
    try {
      if (typeof search === 'string') {
        return await this.cooperatorServiceAdapter.search([search]);
      } else {
        return await this.cooperatorServiceAdapter.search(search);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @ApiCreatedResponse({ type: CooperatorEntity, description: 'the cooperator' })
  @ApiNotFoundResponse()
  @Get(':id')
  async getOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const cooperator = await this.cooperatorServiceAdapter.getOne(id);
      return response.status(HttpStatus.OK).send(cooperator);
    } catch (error) {
      if (error.message === `invalid input syntax for type uuid: \"${id}\"`) {
        error.message = 'Le format du numéro de cooperateur est incorrect.';
      }
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    try {
      const res = await this.cooperatorServiceAdapter.remove(id);
      response.status(HttpStatus.ACCEPTED).send(res);
    } catch (error) {
      if (error.message === `invalid input syntax for type uuid: \"${id}\"`) {
        error.message = 'Le format du numéro de cooperateur est incorrect.';
      }
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  @Patch(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() cooperator: Partial<CooperatorDomain>,
  ) {
    try {
      const cooperatorUpdated = await this.cooperatorServiceAdapter.update(
        id,
        cooperator,
      );
      response.status(HttpStatus.OK).send(cooperatorUpdated);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
