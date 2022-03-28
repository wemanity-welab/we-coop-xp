import { Given, Then, When, Before } from '@cucumber/cucumber';
import { MissionDomain } from '../../../src/domain/mission/MissionDomain';
import { MissionService } from '../../../src/domain/mission/MissionService';
import { expect } from 'chai';
import AdapterMock from '../../mock/mockedAdapter';
import mockedMissions from '../../mock/mockedMissions';

// Step definitions for domain centric testing, at unit level

Before(function () {
  this.missionService = new MissionService(new AdapterMock());
  mockedMissions.forEach((mission) => this.missionService.save(mission));
});
/**
 * Creating mission scenario
 */
Given(
  'Writing a mission with {int}, {string}, {string}, {string}, {string}, {string}, {string}',
  function (
    id,
    profil,
    client,
    description,
    address,
    project,
    duration,
    stack,
    team_organisation,
  ) {
    this.mission = new MissionDomain({
      id,
      profil,
      client,
      description,
      address,
      project,
      duration,
      stack,
      team_organisation,
    });
  },
);

When('The mission has been created', async function () {
  this.result = await this.missionService.save(this.mission);
});

Then(
  'The mission is created and a message {string} is return',
  async function (message) {
    expect(this.result).to.equals(message);
  },
);

/**
 * Updating mission entirely scenario
 */
Given(
  'The employer wants to change entierly the mission n°{int}',
  async function (id) {
    this.id = id;
  },
);

When(
  'The employer update the mission {string}, {string}, {string}, {string}, {string}, {string}',
  async function (
    new_title,
    new_address,
    new_description,
    new_salary,
    new_contract_type,
    new_author,
    new_stack,
    new_team_organisation,
  ) {
    try {
      await this.missionService.update(
        this.id,
        new MissionDomain({
          profil: new_title,
          client: new_address,
          description: new_description,
          address: new_salary,
          project: new_contract_type,
          duration: new_author,
          stack: new_stack,
          team_organisation: new_team_organisation,
        }),
      );
      this.newMission = await this.missionService.getOne(this.id);
    } catch (error) {
      console.error(error);
    }
  },
);

Then(
  'The mission must be modified {string}, {string}, {string}, {string}, {string}, {string} is return',
  async function (title, address, description, salary, contract_type, author) {
    expect(title).to.equals(this.newMission.title);
    expect(address).to.equals(this.newMission.address);
    expect(description).to.equals(this.newMission.description);
    expect(salary).to.equals(this.newMission.salary);
    expect(contract_type).to.equals(this.newMission.contract_type);
    expect(author).to.equals(this.newMission.author);
  },
);

/**
 * Updating mission partially scenario
 */
Given('The employer wants to change the mission n°{int}', async function (id) {
  this.id = id;
});
When(
  'The employer update the mission {string}, {string}',
  async function (new_title, new_address) {
    try {
      await this.missionService.update(
        this.id,
        new MissionDomain({
          ...this.mission,
          profil: new_title,
          client: new_address,
        }),
      );
      this.missionUpdated = await this.missionService.getOne(this.id);
    } catch (error) {
      console.error(error);
    }
  },
);
Then(
  'The mission must be modified {string}, {string} is return',
  async function (new_title, new_address) {
    expect(this.missionUpdated.title).to.equals(new_title);
    expect(this.missionUpdated.address).to.equals(new_address);
  },
);

/**
 * Deleting mission scenario
 */
Given('The employer wants to delete the mission n°{int}', async function (id) {
  this.id = id;
});
When('The employer delete the mission', async function () {
  this.message = await this.missionService.remove(this.id);
});
Then('The mission must not appear in the list', async function () {
  expect(this.message).to.equals('DATA REMOVED');
});

/**
 * List missions
 */
Given('The employer want to list the mission n°{int}', async function (id) {
  this.id = id;
});
When('The employer find the mission', async function () {
  this.mission = await this.missionService.getOne(this.id);
});
Then('The mission must appear', async function () {
  expect(await this.missionService.getOne(this.mission.getId)).to.equals(
    this.mission,
  );
});
