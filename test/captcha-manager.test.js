'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

const CaptchaManager = require('../dist/index').CaptchaManager;

describe('CaptchaManager', () => {
  describe('#getCaptchaToken', async () => {
    it('should throw if not initialized', async () => {
      const captchaManager = new CaptchaManager();
      expect(captchaManager.getCaptchaToken('http://www.ayinope.com', '6LdTNzIUAAAAAJxPWnEnY7PFdlXyZBO5LO8k4eP7')).to.eventually.be.rejectedWith('EzHarvest not initialized');
    });

    it('should get a token manually', async function() {
      this.timeout(60000);

      const captchaManager = new CaptchaManager();
      await captchaManager.initialize();

      const captchaToken = await captchaManager.getCaptchaToken('http://www.ayinope.com', '6LdTNzIUAAAAAJxPWnEnY7PFdlXyZBO5LO8k4eP7');
      
      expect(captchaToken).to.have.property('value');
    });
  });
});
