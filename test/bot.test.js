'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

const Bot = require('../dist/index').Bot;

describe('Bot', () => {
  it('should throw because run is not implemented', async () => {
    const bot = new Bot();
    expect(bot.run()).to.eventually.be.rejectedWith('Method not implemented');
  });
});
