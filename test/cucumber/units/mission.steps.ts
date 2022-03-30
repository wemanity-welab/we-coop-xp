import { Given, Then, When, Before } from '@cucumber/cucumber';
import { MissionDomain } from '../../../src/domain/mission/MissionDomain';
import { MissionService } from '../../../src/domain/mission/MissionService';
import { expect } from 'chai';
import AdapterMock from '../../mock/mockedAdapter';

// Step definitions for domain centric testing, at unit level

Before(function () {
  const adapter: any = new AdapterMock();
  return (this.missionService = new MissionService(adapter));
});
//     Scenario: A user wants to post a mission

Given(/^A user mission with details as shown in the table$/, function (table) {
  this.mission = new MissionDomain(table.rowsHash());
});

When('The user posts the mission', async function () {
  this.result = await this.missionService.save(this.mission);
});
Then(/^The mission is created as shown in the table$/, function (table) {
  this.expectedMission = new MissionDomain(table.rowsHash());
  expect(this.result).to.eql(this.expectedMission);
});

//Scenario: The employer wants to list all current missions

Given(
  /^An employer are existing missions as followed$/,
  async function (table) {
    this.missions = table
      .hashes()
      .map((mission: any) => new MissionDomain(mission));

    this.missions.forEach(
      async (mission: any) => await this.missionService.save(mission),
    );
  },
);

When('The employer list all missions', async function () {
  this.result = await this.missionService.getAll();
});
Then(/^All missions appear in the list as followed:$/, function (table) {
  this.missionsExpected = table
    .hashes()
    .map((mission: any) => new MissionDomain(mission));
  expect(this.result).to.eql(this.missionsExpected);
});

// Scenario: A client wants to update a posted mission
Given(/^An existing mission with details as followed$/, async function (table) {
  this.mission = new MissionDomain(table.rowsHash());
  this.missionSaved = await this.missionService.save(this.mission);
  this.id = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  console.log(this.id);
});
When(
  /^The user updates a few attributes of the mission as shown$/,
  async function (table) {
    this.elementsToModify = table.rowsHash();
    await this.missionService.update(this.id, this.elementsToModify);
    this.missionUpdated = await this.missionService.getOne(this.id);
  },
);
Then(/^The mission is modified as followed$/, async function (table) {
  this.expectedMission = table.rowsHash();

  expect(this.missionUpdated).to.eql(this.expectedMission);
});
