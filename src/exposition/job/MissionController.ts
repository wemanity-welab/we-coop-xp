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
    @Body() mission: MissionDomain,
    @Res() response: Response,
  ): Promise<string | void> {
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
    @Body() mission: MissionDomain,
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
