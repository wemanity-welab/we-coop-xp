import {Given, Then, When} from '@cucumber/cucumber';  
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai'
import * as request from 'supertest';

import { ExampleModel } from '../../../src/domain/models/example.model';
import { ExampleService } from '../../../src/domain/services/example.service';
import { ExampleRepository } from '../../../src/domain/interfaces/example.repository';
import { AppModule } from '../../../src/exposition/app.module';


Given('Writing a example with {string}', function (description: string) {
    // Write code here that turns the phrase above into concrete actions
    this.payload = {"description": description}
});

When('I submit the example',  async function ()  {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      const app = moduleFixture.createNestApplication();

      await app.init();
    
    this.exampleRequest = request(app.getHttpServer())
        .post('/example')
        .send(this.payload)
});
 
Then('I received a {string} message', function (message: string) {

    this.exampleRequest.end((err, res) => {
        expect(res.text).to.equals(message)
    })
    
});


