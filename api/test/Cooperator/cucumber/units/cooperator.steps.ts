import { Given, Then, When, Before } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CooperatorDomain } from '../../../../src/domain/cooperator/cooperator.domain';
import { CooperatorService } from '../../../../src/domain/Cooperator/cooperator.service';
import AdapterMock from '../../mock/mockedAdapter';

// Step definitions for domain centric testing, at unit level

/**
 * Scenario: An employer wants to create a cooperator
 */
Before(function () {
  const adapter: any = new AdapterMock();
  this.service = new CooperatorService(adapter);
});

Given(
  /^An employer that want to save cooperator details as shown in the table$/,
  function (table) {
    this.cooperator = new CooperatorDomain(table.rowsHash());
  },
);

When(
  /^The employer write cooperator details and submit it$/,
  async function () {
    this.result = await this.service.save(this.cooperator);
  },
);

Then(/^The cooperator is created as shown in the table$/, function (table) {
  this.expectedCooperator = new CooperatorDomain(table.rowsHash());
  expect(this.result).to.eql(this.expectedCooperator);
});

/**
 * Scenario: An employer wants to display a cooperators list
 */
Given(
  /^An employer that wants to display an existing cooperators list as followed$/,
  async function (table) {
    this.cooperators = table
      .hashes()
      .map((cooperator: any) => new CooperatorDomain(cooperator));

    this.cooperators.forEach(
      async (cooperator: any) => await this.service.save(cooperator),
    );
  },
);

When(/^The employer display the cooperators list$/, async function () {
  this.result = await this.service.getAll();
});
Then(/^All cooperators appear in the list as followed:$/, function (table) {
  this.cooperatorsExpected = table
    .hashes()
    .map((cooperator: any) => new CooperatorDomain(cooperator));
  expect(this.result).to.eql(this.cooperatorsExpected);
});

/**
 * Scenario: An employer wants to update cooperator data
 */
Given(
  /^An employer that want to update cooperator data, they are display as shown in the table$/,
  async function (table) {
    this.cooperator = new CooperatorDomain(table.rowsHash());
    this.savedCooperator = await this.service.save(this.cooperator);
    this.id = this.savedCooperator.id;
  },
);
When(
  /^The employer write few attributes of the cooperator as shown and submit it$/,
  async function (table) {
    this.attributes = table.rowsHash();
    await this.service.update(this.id, this.attributes);

    this.updatedCooperator = new CooperatorDomain(
      await this.service.getOne(this.id),
    );
  },
);
Then(/^The cooperator is modified as followed$/, async function (table) {
  this.expectedCooperator = new CooperatorDomain(table.rowsHash());
  expect(this.updatedCooperator).to.eql(this.expectedCooperator);
});

/**
 * Scenario: The employer wants to delete a cooperator
 */
Given(
  /^An employer that wants to delete an existing cooperator as followed$/,
  async function (table) {
    this.cooperator = await this.service.save(
      new CooperatorDomain(table.rowsHash()),
    );
  },
);

When(/^The employer delete the cooperator n°<id>$/, async function (table) {
  this.id = table.rowsHash().id;
  this.deletedCooperator = await this.service.remove(this.id);
});

Then(/^A message is shown$/, async function (table) {
  this.message = table.rowsHash().message;
  expect(await this.deletedCooperator).to.eql(this.message);
});

/**
 * Scenario: The employer wants to search cooperators according to some keywords
 */
Given(
  /^An Employer who wants to search a cooperator and there are existing cooperators as followed$/,
  async function (table) {
    this.cooperators = table.hashes();

    this.cooperators.forEach(
      async (cooperator: any) => await this.service.save(cooperator),
    );
  },
);

When(/^The employer search cooperators with keywords$/, async function (table) {
  this.table = table.hashes();

  this.keywords = this.table[0].keywords.split(/[\s,]+/);
  await Promise.all(this.keywords)
    .then(async () => {
      this.cooperatorsFiltered = await this.service.search(this.keywords);
    })
    .catch((e) => {
      console.log(e);
    });
});

Then(/^Cooperators list appear as followed:$/, function (table) {
  this.cooperatorsExpected = table.hashes();
  expect(this.cooperatorsFiltered).to.eql(this.cooperatorsExpected);
});
