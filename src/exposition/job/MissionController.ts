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
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Mission } from '../../types/Mission';
import { MissionDomain } from '../../domain/mission/MissionDomain';
import { MissionEntity } from '../../infrastructure/job/MissionEntity';
import { MissionServiceAdapter } from './MissionServiceAdapter';
@ApiTags('Missions')
@Controller('missions')
export class MissionController {
  constructor(private readonly missionServiceAdapter: MissionServiceAdapter) {}

  @ApiCreatedResponse({ type: MissionEntity })
  @Post()
  async create(
    @Body() mission: Mission,
    @Res() response: Response,
  ): Promise<MissionDomain | void> {
    const status = await this.missionServiceAdapter.save(mission);
    response.status(HttpStatus.CREATED).send(status);
  }

  @ApiCreatedResponse({
    type: MissionEntity,
    isArray: true,
    description: 'Table of missions',
  })
  @Get()
  async getAll(@Res() response: Response): Promise<void> {
    const missions = await this.missionServiceAdapter.getAll();
    response.status(HttpStatus.OK).send(missions);
  }
  @Get('search')
  async search(@Query('criteria') search: string[]) {
    if (typeof search === 'string') {
      return await this.missionServiceAdapter.search([search]);
    } else if (search !== undefined && search.length > 0) {
      return await this.missionServiceAdapter.search(search);
    } else {
      throw new Error('Incorrect search');
    }
  }
  @ApiCreatedResponse({ type: MissionEntity, description: 'the job' })
  @ApiNotFoundResponse()
  @Get(':id')
  async getOne(@Res() response: Response, @Param('id') missionId: string) {
    const mission = await this.missionServiceAdapter.getOne(missionId);
    if (!mission) {
      throw new NotFoundException();
    }
    return response.status(HttpStatus.OK).send(mission);
  }

  @Delete(':id')
  async deleteMission(
    @Res() response: Response,
    @Param('id') missionId: string,
  ) {
    const message = await this.missionServiceAdapter.remove(missionId);
    response.status(HttpStatus.ACCEPTED).send(message);
  }
  @Patch(':id')
  async updateMission(
    @Res() response: Response,
    @Param('id') missionId: string,
    @Body() mission: Partial<MissionDomain>,
  ) {
    let resp;
    try {
      resp = await this.missionServiceAdapter.update(missionId, mission);
    } catch (error) {
      if (error == 'mission not found') {
        console.log(error);
      }
    }
    response.status(HttpStatus.OK).send(resp);
  }
}
