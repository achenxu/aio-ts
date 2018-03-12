'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

const ApiWrapper = require('../dist/index').ApiWrapper;

describe('ApiWrapper', () => {
  describe('#makeUrl', () => {
    const apiWrapper = new ApiWrapper;
    apiWrapper.baseUrl = 'https://www.test.com/';

    it('should do nothing if the URL has an http prefix', async () => {
      const url = 'https://www.example.com';
      expect(apiWrapper.makeUrl(url)).to.equal(url, 'URL was changed');
    });

    it('should prepend the baseUrl if the URL has no prefix', async () => {
      const endpoint = 'some/api/endpoint';
      expect(apiWrapper.makeUrl(endpoint)).to.equal(apiWrapper.baseUrl + endpoint, 'baseUrl not appended correctly');
    });
  })
});
