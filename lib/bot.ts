import { IProxy } from './proxy';

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

  constructor(task: ITask) {
    this.task = task;
  }

  async run(): Promise<any> {
    throw new Error('Method not implemented');
  }
}
