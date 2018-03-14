# aio-ts

`aio-ts` is a (sneaker) bot framework written in TypeScript. `aio-ts` makes it easier to develop bots, particularly for use in [Electron](https://electronjs.org) applications. Never worry about managing proxies. Captcha plugins for 2Captcha, Anti Captcha, and manual solving. 

## Overview

Today's sneaker bots have to worry about a bunch of different things. Hopefully, you're separating your bots from your api wrappers, but we know that's annoyingly difficult to maintain. If you're making loads of requests, you'll probably need to put your bots behind proxies. If you're writing bots for most websites today, you'll also have to worry about Captcha.

`aio-ts` is a bot framework that does the heavy lifting of writing sneaker bots for you. It's obnoxious to have to deal with bot/api classes, proxies, and captcha every single time you want to create a new bot. `aio-ts` abstracts most of this so you can focus on what's important - writing fast bots. 

