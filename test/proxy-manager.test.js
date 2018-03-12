'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

// Seed Math.random so we'll always get the same proxies
const seedrandom = require('seedrandom');
seedrandom('aio-ts', { global: true });

const ProxyManager = require('../dist/index').ProxyManager;

describe('ProxyManager', () => {
  const proxies = [{
    ip: '127.0.0.1',
    port: '1234'
  }, {
    ip: '127.0.0.1',
    port: '4321'
  }];
  const proxyManager = new ProxyManager(proxies);

  describe('#formatProxy', () => {
    it('should correctly format an IP:PORT proxy', () => {
      const proxy = {
        ip: '127.0.0.1',
        port: '5678'
      };
      expect(proxyManager.formatProxy(proxy)).to.equal(`http://${proxy.ip}:${proxy.port}`);
    });

    it('should correctly format a USERNAME:PASSWORD:IP:PORT proxy', () => {
      const proxy = {
        ip: '127.0.0.1',
        port: '5678',
        username: 'abc',
        password: '123'
      };
      expect(proxyManager.formatProxy(proxy)).to.equal(`http://${proxy.username}:${proxy.password}@${proxy.ip}:${proxy.port}`);
    });
  });

  describe('#getRandomProxy', () => {
    it('should return a random proxy', () => {
      expect(proxyManager.getRandomProxy()).to.equal(proxies[1]);
      expect(proxyManager.getRandomProxy()).to.equal(proxies[0]);
      expect(proxyManager.getRandomProxy()).to.equal(proxies[0]);
    });
  });

  describe('#getRandomFormattedProxy', () => {
    it('should return a random formatted proxy', () => {
      expect(proxyManager.getRandomFormattedProxy()).to.equal(proxyManager.formatProxy(proxies[1]));
      expect(proxyManager.getRandomFormattedProxy()).to.equal(proxyManager.formatProxy(proxies[1]));
      expect(proxyManager.getRandomFormattedProxy()).to.equal(proxyManager.formatProxy(proxies[1]));
    });
  });
});
