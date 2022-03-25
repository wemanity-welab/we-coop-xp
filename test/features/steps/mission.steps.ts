import { Given, Then, When, Before } from '@cucumber/cucumber';
import { MissionDomain } from '../../../src/domain/mission/MissionDomain';
import { MissionService } from '../../../src/domain/mission/MissionService';
import { expect } from 'chai';
import AdapterMock from '../../mock/mockedAdapter';
import mockedMissions from '../../mock/mockedMissions';

Before(function () {
  this.missionService = new MissionService(new AdapterMock());
});
/**
 * Creating mission scenario
 */
Given(
  'Writing a mission with {int}, {string}, {string}, {string}, {string}, {string}, {string}',
  function (id, title, address, description, salary, contract_type, author) {
    this.mission = new MissionDomain({
      id,
      title,
      address,
      description,
      salary,
      contract_type,
      author,
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
  'The employer wants to change a mission which exist already',
  async function () {
    mockedMissions.forEach((mission) => this.missionService.save(mission));
    this.mission = await this.missionService.getOne(3);
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
  ) {
    try {
      await this.missionService.update(
        this.mission.getId,
        new MissionDomain({
          ...this.mission,
          title: new_title,
          address: new_address,
          description: new_description,
          salary: new_salary,
          contract_type: new_contract_type,
          author: new_author,
        }),
      );
    } catch (error) {
      console.error(error);
    }
    this.newMission = await this.missionService.getOne(3);
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
Given('The employer wants to change a mission which exist', async function () {
  mockedMissions.forEach((mission) => this.missionService.save(mission));
  this.mission = await this.missionService.getOne(3);
});
When(
  'The employer update the mission {string}, {string}',
  async function (new_title, new_address) {
    try {
      await this.missionService.update(
        this.mission.getId,
        new MissionDomain({
          ...this.mission,
          title: new_title,
          address: new_address,
        }),
      );
      this.missionUpdated = await this.missionService.getOne(3);
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
Given(
  'The employer wants to delete a mission which exist with an id {int}',
  async function (id) {
    this.id = id;
    mockedMissions.forEach((mission) => this.missionService.save(mission));
    this.mission = await this.missionService.getOne(id);
  },
);
When('The employer delete the mission', async function () {
  this.message = await this.missionService.remove(this.mission.getId);
});
Then('The mission must not appear in the list', async function () {
  expect(await this.missionService.getOne(this.id)).to.equals(undefined);
  expect(this.message).to.equals('DATA REMOVED');
});

/**
 * Reading missions
 */
Given('The employer want to read a mission wich exist', async function () {
  mockedMissions.forEach((mission) => this.missionService.save(mission));
});
When('The employer find the mission with an id {int}', async function (id) {
  this.id = id;
  this.mission = await this.missionService.getOne(this.id);
  this.response = await this.missionService.getOne(this.mission.getId);
});
Then('The mission must appear', async function () {
  expect(await this.missionService.getOne(this.id)).to.equals(this.mission);
});
