import { IProxy } from './proxy';
import { CaptchaManager } from './captcha-manager';

export interface ITask {
  id: string;
  proxies: IProxy[];
  data: any;
  status?: string;
}

export interface IBot {
  task: ITask;

  run(): Promise<any>;
}

export class Bot implements IBot {
  task: ITask;
  captchaManager: CaptchaManager;

  constructor(task: ITask) {
    this.task = task;
    this.captchaManager = new CaptchaManager();
  }

  async run(): Promise<any> {
    throw new Error('Method not implemented');
  }
}
