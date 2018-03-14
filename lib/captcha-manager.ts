import * as EzHarvest from 'ez-harvest';

export interface ICaptchaToken {
  value: string;
  createdAt: number;
}

export interface ICaptchaManager {
  getCaptchaToken(pageUrl: string, sitekey: string, mode: number): Promise<ICaptchaToken>;
}

export class CaptchaManager implements ICaptchaManager {
  MANUAL = 0;
  private ezHarvest: any;
  private ezHarvestReady = false;

  constructor() {
    this.ezHarvest = new EzHarvest();
  }

  async initialize(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.ezHarvest.start().then(() => {
        this.ezHarvestReady = true;
        resolve();
      });
    });
  }

  async getCaptchaToken(pageUrl: string, sitekey: string, mode: number = 0): Promise<ICaptchaToken> {
    switch (mode) {
      default:
        if (!this.ezHarvestReady) {
          throw new Error('EzHarvest not initialized');
        }
        return this.ezHarvest.getCaptchaToken(pageUrl, sitekey);
    }
  }
}
