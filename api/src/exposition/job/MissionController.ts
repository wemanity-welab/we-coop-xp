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
import { Mission } from '../../../test/utils/types/Mission';
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
  ): Promise<string | void> {
    const values = Object.values(mission);
    values.map((el) => {
      if (el === '') {
        throw new HttpException(
          'Tous les champs doivent être renseignés',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    const res = await this.missionServiceAdapter.save(mission);
    response.status(HttpStatus.CREATED).send(res);
  }
  @ApiCreatedResponse({
    type: MissionEntity,
    isArray: true,
    description: 'Table of missions',
  })
  @Get()
  async getAll(@Res() response: Response): Promise<void> {
    const missions = await this.missionServiceAdapter.getAll();
    if (!missions)
      throw new HttpException(
        'Aucune mission dans la base de données',
        HttpStatus.NOT_FOUND,
      );
    response.status(HttpStatus.OK).send(missions);
  }
  @Get('search')
  async search(@Query('criteria') search: string[]) {
    if (typeof search === 'string') {
      const searchedMission = await this.missionServiceAdapter.search([search]);
      if (searchedMission.length === 0) {
        throw new HttpException('Aucune correspondance', HttpStatus.NOT_FOUND);
      } else return searchedMission;
    } else {
      const searchedMission = await this.missionServiceAdapter.search(search);
      if (searchedMission.length === 0) {
        throw new HttpException('Aucune correspondance', HttpStatus.NOT_FOUND);
      } else return searchedMission;
    }
  }
  @ApiCreatedResponse({ type: MissionEntity, description: 'the mission' })
  @ApiNotFoundResponse()
  @Get(':id')
  async getOne(@Res() response: Response, @Param('id') missionId: string) {
    const mission = await this.missionServiceAdapter.getOne(missionId);
    if (!mission) {
      throw new HttpException('Aucune mission trouvée', HttpStatus.NOT_FOUND);
    }
    return response.status(HttpStatus.OK).send(mission);
  }

  @Delete(':id')
  async deleteMission(
    @Res() response: Response,
    @Param('id') missionId: string,
  ) {
    const res = await this.missionServiceAdapter.remove(missionId);
    response.status(HttpStatus.ACCEPTED).send(res);
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
