<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
<img src="https://cdn.cookielaw.org/logos/aa61bc99-4bbe-41c8-922a-845ae4c1c62f/018e66da-0df4-7700-9172-10dc7e1a65a8/3f49b566-3f20-4b54-b39a-57bde709c32e/MongoDB_SlateBlue.png" width="1000" alt="Nest Logo" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

<p align="center">  nest-mongo - micro API </p>

## Description

Testing my first Nest API

## Installation

```bash
$ yarn install
```

## Running the app

```bash
nest start
```

## Routes : 
  ### Sign up :
```bash
http://localhost:3000/auth/signup
```
example: 
```json
{
 "name": "",
 "email": "@",
 "password": "" 
}
```
  ### Sign in :
```bash
http://localhost:3000/auth/signin
```
```json
{
 "email": "@",
 "password": ""
}
```
  ### POST new item :
```bash
http://localhost:3000/items/add
```
```json
{ 

        "title": "",
        "description": "",
        "price": 0,
        "isSold": false,
        "category": "other",
        "images": [
            "http://1",
            "http://2"
        ]
  
  }
```
  ### List all with 2 items max per page :
```bash
http://localhost:3000/items
http://localhost:3000/items?searchItem={your search}
http://localhost:3000/items?page={your page}
```
  ## Find one Item :
```bash
http://localhost:3000/items/{ID of item}
```

## Stripe Payment :

### Create / make a payment / BUY : 

    http://localhost:3000/payments/create/{itemId}

res example:
```json
```

### Get a Payment / Payment record:

    http://localhost:3000/payments/{paymentId}

res example:
```json
{
    "_id": "PAYMENT_ID",
    "user": {
        "_id": "USER_ID",
        "name": "Luke",
        "email": "luke@gmail.com",
        "password": "$2b$10$QXlUZN5qFqHxFM.NQY.xmuh7D4l8vfNnFV6ShnZmmcOqG9FZm1uSK",
        "createdAt": "2024-06-27T16:48:39.027Z",
        "updatedAt": "2024-06-27T16:48:39.027Z",
        "__v": 0
    },
    "item": {
        "_id": "6682ec1a9e36c40cda91e07a",
        "title": "Guitar",
        "description": "entirely made of steel",
        "price": 2000,
        "currency": "usd",
        "isSold": false,
        "category": "other",
        "images": [
            "http://1",
            "http://2"
        ],
        "user": "USER_ID",
        "createdAt": "2024-07-01T17:49:14.031Z",
        "updatedAt": "2024-07-01T17:49:14.031Z",
        "__v": 0
    },
    "amount": 2000,
    "currency": "usd",
    "paymentMethodId": "pm_card_visa",
    "status": "succeeded",
    "__v": 0
}
```
