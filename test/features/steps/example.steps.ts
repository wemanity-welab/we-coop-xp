import { Given, Then, When } from '@cucumber/cucumber';
import { ExampleModel } from '../../../src/domain/models/example.model';
import { ExampleService } from '../../../src/domain/services/example.service';
import { ExampleAdapter } from '../../../src/infrastructure/example.repository.adapter';
import { expect } from 'chai';
import { ExampleEntity } from '../../../src/domain/entities/example.entities';

Given(
  'Writing a example with {string}',
  function (description: string) {
    // Write code here that turns the phrase above into concrete actions
    this.exampleModel = new ExampleModel(description);
  },
);

When('I save the example', function () {

  const exampleAdapter = new ExampleAdapter(undefined);

    exampleAdapter.save = (example: ExampleModel) => {
        return "Success";
    };

    exampleAdapter.getAll = (): Promise<ExampleEntity[]> =>{
        throw new Error('Function not implemented.');
    };
  
  this.exampleService = new ExampleService(exampleAdapter);
});

Then('I received a {string} message', function (message: string) {
  expect(this.exampleService.create(this.exampleModel)).to.equals(message);
});
