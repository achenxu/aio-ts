import * as request from 'request-promise-native';

import { IProxy } from './proxy';
import { ProxyManager } from './proxy-manager';

export interface IApiWrapper {
  baseUrl: string;

  request(method: string, url: string, options: any): Promise<any>;
  get(url: string, options: any): Promise<any>;
  post(url: string, options: any): Promise<any>;
  put(url: string, options: any): Promise<any>;
  patch(url: string, options: any): Promise<any>;
  delete(url: string, options: any): Promise<any>;
}

export class ApiWrapper implements IApiWrapper {
  baseUrl = '';
  private defaultHeaders: any = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  };
  private cookieJar: any = request.jar();
  private proxyManager: ProxyManager;

  constructor(proxies: IProxy[] = []) {
    this.proxyManager = new ProxyManager(proxies);
  }

  makeUrl(url: string): string {
    return url.startsWith('http') ? url : this.baseUrl + url;
  }

  async request(method: string, url: string, options: any = {}): Promise<any> {
    // Make sure we don't override the User-Agent header unless specifically set
    options.headers = Object.assign(this.defaultHeaders, options.headers);

    // Set defaults and override if specified
    const requestOptions = Object.assign({
      uri: this.makeUrl(url),
      method: method,
      proxy: this.proxyManager.getRandomFormattedProxy(),
      gzip: true,
      jar: this.cookieJar,
      followAllRedirects: true,
      resolveWithFullResponse: true
    }, options);

    return request(requestOptions);
  }

  async get(url: string, options: any = {}): Promise<any> {
    return this.request('GET', url, options);
  }

  async post(url: string, options: any = {}): Promise<any> {
    return this.request('POST', url, options);
  }

  async put(url: string, options: any = {}): Promise<any> {
    return this.request('PUT', url, options);
  }

  async patch(url: string, options: any = {}): Promise<any> {
    return this.request('PATCH', url, options);
  }

  async delete(url: string, options: any = {}): Promise<any> {
    return this.request('DELETE', url, options);
  }
}
