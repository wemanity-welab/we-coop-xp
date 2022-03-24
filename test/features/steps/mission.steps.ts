import { Given, Then, When } from '@cucumber/cucumber';
import { MissionDomain } from '../../../src/domain/mission/MissionDomain';
import { MissionService } from '../../../src/domain/mission/MissionService';
import { expect } from 'chai';
import Mock from '../../mock/mockedAdapter';
import mockedMissions from '../../mock/mockedMissions';

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
  return (this.missionService = await new MissionService(new Mock()));
});

Then(
  'The mission is created and a message {string} is return',
  async function (message) {
    expect(await this.missionService.save(this.mission)).to.equals(message);
  },
);

/**
 * Updating mission entirely scenario
 */
Given(
  'The employer wants to change a mission which exist already',
  async function () {
    this.missionService = new MissionService(new Mock());
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
  },
);

Then(
  'The mission must be modified {string}, {string}, {string}, {string}, {string}, {string} is return',
  async function (title, address, description, salary, contract_type, author) {
    this.newMission = await this.missionService.getOne(3);
    this.mission = {
      title,
      address,
      description,
      salary,
      contract_type,
      author,
    };
    expect(this.mission.title).to.equals(this.newMission.title);
    expect(this.mission.address).to.equals(this.newMission.address);
    expect(this.mission.description).to.equals(this.newMission.description);
    expect(this.mission.salary).to.equals(this.newMission.salary);
    expect(this.mission.contract_type).to.equals(this.newMission.contract_type);
    expect(this.mission.author).to.equals(this.newMission.author);
  },
);

/**
 * Updating mission partially scenario
 */
Given('The employer wants to change a mission which exist', async function () {
  this.missionService = new MissionService(new Mock());
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
    } catch (error) {
      console.error(error);
    }
  },
);
Then(
  'The mission must be modified {string}, {string} is return',
  async function (new_title, new_address) {
    this.missionUpdated = await this.missionService.getOne(3);

    expect(await this.missionUpdated.title).to.equals(new_title);
    expect(await this.missionUpdated.address).to.equals(new_address);
  },
);

/**
 * Deleting mission scenario
 */
Given(
  'The employer wants to delete a mission which exist with an id {int}',
  async function (id) {
    this.id = id;
    this.missionService = new MissionService(new Mock());
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
Given(
  'The employer want to read a mission wich exist with an id {int}',
  async function (id) {
    this.id = id;
    this.missionService = new MissionService(new Mock());
    mockedMissions.forEach((mission) => this.missionService.save(mission));
    this.mission = await this.missionService.getOne(id);
  },
);
When('The employer find the mission', async function () {
  this.response = await this.missionService.getOne(this.mission.getId);
});
Then('The mission must appear', async function () {
  expect(await this.missionService.getOne(this.id)).to.equals(this.mission);
});
