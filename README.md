# aio-ts

`aio-ts` is a (sneaker) bot framework written in TypeScript. `aio-ts` makes it easier to develop bots, particularly for use in [Electron](https://electronjs.org) applications. Never worry about managing proxies. Captcha plugins for 2Captcha, Anti Captcha, and manual solving. 

## Overview

Today's sneaker bots have to worry about a bunch of different things. Hopefully, you're separating your bots from your api wrappers, but we know that's annoyingly difficult to maintain. If you're making loads of requests, you'll probably need to put your bots behind proxies. If you're writing bots for most websites today, you'll also have to worry about Captcha.

`aio-ts` is a bot framework that does the heavy lifting of writing sneaker bots for you. It's obnoxious to have to deal with bot/api classes, proxies, and captcha every single time you want to create a new bot. `aio-ts` abstracts most of this so you can focus on what's important - writing fast bots. 

## Installation

You can easily include `aio-ts` in your project by installing via `npm`:

```
$ npm install --save aio-ts
```

## Usage

Once you've installed `aio-ts`, you can start writing bots. Here's a sample bot that makes use of every aspect of `aio-ts`.

```ts
// sample-api-wrapper.ts

import { ApiWrapper } from 'aio-ts';

class SampleApiWrapper extends ApiWrapper {
    async addProductToCart(productId: string, captchaToken: string): Promise<any> {
        return this.post('/product/add', {
            body: {
                productId: productId,
                captchaToken: captchaToken
            }
            json: true
        });
    }
}

```

```ts
// sample-bot.ts

import { Bot, CaptchaManager } from 'aio-ts';
import { SampleApiWrapper } from './sample-api-wrapper';

class SampleBot extends Bot {
    async run(): Promise<any> {
        const proxies = [{
            ip: '127.0.0.1',
            port: '1234'
        }];
        const apiWrapper = new SampleApiWrapper(proxies);
        const captchaManager = new CaptchaManager();

        await captchaManager.initialize();

        const captchaToken = await captchaManager.getCaptchaToken('http://www.ayinope.com', '6LdTNzIUAAAAAJxPWnEnY7PFdlXyZBO5LO8k4eP7');
        const productId = '1234';
        await apiWrapper.addProductToCart(productId, captchaToken.value);
    }
}

```
