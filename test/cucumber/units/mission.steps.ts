import { Given, Then, When, Before } from '@cucumber/cucumber';
import { MissionDomain } from '../../../src/domain/mission/MissionDomain';
import { MissionService } from '../../../src/domain/mission/MissionService';
import { expect } from 'chai';
import assert from 'assert';
import AdapterMock from '../../mock/mockedAdapter';
import mockedMissions from '../../mock/mockedMissions';

// Step definitions for domain centric testing, at unit level

Before(function () {
  this.missionService = new MissionService(new AdapterMock());
});

//  Scenario:Creating mission scenario

Given(/^A Client give a mission$/, function (table) {
  this.mission = new MissionDomain(table.rowsHash());
});
When('The mission has been created', async function () {
  this.result = await this.missionService.save(this.mission);
});
Then(
  /^The mission is created and a message is return$/,
  async function (table) {
    expect(await this.result).to.equals(this.mission);
  },
);

//Scenario: The employer wants to list all current missions

Given(/^An employer has several currents missions$/, async function (table) {
  this.missions = new MissionDomain(table.rows());
  //   this.missionSaved = await this.missionService.save(this.missions);
  console.log('mission ', this.missions);
});
