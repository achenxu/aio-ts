import { IProxy } from './proxy';

export interface IProxyManager {
  proxies: IProxy[];

  formatProxy(proxy: IProxy): string;
  getRandomProxy(): IProxy;
  getRandomFormattedProxy(): string;
}

export class ProxyManager {
  proxies: IProxy[];

  constructor(proxies: IProxy[] = []) {
    this.proxies = proxies;
  }

  formatProxy(proxy: IProxy): string {
    return 'http://' +
      (proxy.username ? `${proxy.username}:${proxy.password}@` : '') +
      `${proxy.ip}:${proxy.port}`;
  }

  getRandomProxy(): IProxy | null {
    return this.proxies.length > 0 ? this.proxies[Math.floor(Math.random() * this.proxies.length)] : null;
  }

  getRandomFormattedProxy(): string | null {
    const proxy = this.getRandomProxy();
    return proxy ? this.formatProxy(proxy) : null;
  }
}
