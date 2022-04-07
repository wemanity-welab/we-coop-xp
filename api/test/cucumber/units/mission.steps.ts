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
    this.missionUpdatedNewDomain = new MissionDomain(this.missionUpdated);
  },
);
Then(/^The mission is modified as followed$/, async function (table) {
  this.expectedMission = new MissionDomain(table.rowsHash());
  expect(this.missionUpdatedNewDomain).to.eql(this.expectedMission);
});

//    Scenario: The user wants to delete a mission

Given(/^an existing mission with details as followed$/, async function (table) {
  this.missionSaved = await this.missionService.save(
    new MissionDomain(table.rowsHash()),
  );
});

When(/^The user delete the mission with n°<id>$/, async function (table) {
  this.missionDeleted = await this.missionService.remove(
    this.missionSaved.getId,
  );
  console.log(' this.missionDeleted', this.missionDeleted);
});

Then(/^A message <message> is shown$/, async function (table) {
  this.table = table.rowsHash();
  console.log('message', this.table.message);
  expect(await this.missionDeleted).to.equals(this.table.message);
});

//@MissionPosting
//Scenario: The employer wants to search missions according to some keywords
Given(
  /^An Employer who wants to search a mission and there are existing missions as followed$/,
  async function (table) {
    this.missions = table.hashes();

    this.missions.forEach(
      async (mission: any) => await this.missionService.save(mission),
    );
  },
);
When(/^The employer search missions with keywords$/, async function (table) {
  this.table = table.hashes();

  this.keyword = this.table[0].keywords.split(/[\s,]+/);
  await Promise.all(this.keyword)
    .then(async () => {
      this.missionFiltered = await this.missionService.search(this.keyword);
    })
    .catch((e) => {
      console.log(e);
    });
});

Then(/^Missions list appear as followed:$/, function (table) {
  this.missionsExpected = table.hashes();
  expect(this.missionFiltered).to.eql(this.missionsExpected);
});
