# lego-webapp [![DroneCI](https://ci.abakus.no/api/badges/webkom/lego-webapp/status.svg?branch=master)](https://ci.abakus.no/webkom/lego-webapp) [![dependencies Status](https://david-dm.org/webkom/lego-webapp/status.svg)](https://david-dm.org/webkom/lego-webapp) [![devdependencies Status](https://david-dm.org/webkom/lego-webapp/dev-status.svg)](https://david-dm.org/webkom/lego-webapp?type=dev)

> Open source frontend for abakus.no

[![MIT](https://badgen.net/badge/license/MIT/blue)](https://en.wikipedia.org/wiki/MIT_License) [![last commit](https://badgen.net/github/last-commit/webkom/lego-webapp/)](https://github.com/webkom/lego-webapp/commits/master) [![coontibutors](https://badgen.net/github/contributors/webkom/lego-webapp)](https://github.com/webkom/lego-webapp/graphs/contributors)

> **Issues**: We track issues in the main repo of LEGO: https://github.com/webkom/lego

[![open issues](https://badgen.net/github/open-issues/webkom/lego)](https://github.com/webkom/lego/issues)

## Getting Started

### Installing dependencies

```bash
$ yarn
```

### Starting the client

```bash
$ yarn start
```

Everything should be up and running on [localhost:3000](http://localhost:3000).

For instructions on how to run the backend, see
[webkom/lego](https://github.com/webkom/lego).

#### Running without a local backend

It is possible to run the frontend without running the backend, by using our staging environment:

```bash
$ yarn start:staging
```

## Server side rendering

In production we use server side rendering. Due to bad hot reloading, we don't use it by default in dev. The server side renderer can be started by running:

```bash
$ yarn build
$ yarn ssr # or yarn ssr:staging
```

### Environment Variables

- `NODE_ENV` _(optional)_
  - `development` during development and `production` when using in (or testing _for_) production
- `API_URL` _(optional)_
  - Url to the LEGO api. Usually ends with `/api/v1`
- `WS_URL` _(optional)_
  - Url to the LEGO websocket endpoint
- `BASE_URL` _(optional)_
  - Url to the base of the LEGO api. Usaully just the root domain.
- `SEGMENT_WRITE_KEY` _(optional)_
  - More info here: <https://segment.com/docs/guides/setup/how-do-i-find-my-write-key/>
- `CAPTCHA_KEY` _(optional)_
  - More info here: <https://developers.google.com/recaptcha/docs/display>
- `STRIPE_KEY` _(optional)_
  - More info here: <https://stripe.com/docs/keys>
- `RAVEN_DSN` _(optional)_
  - More info here: https://github.com/getsentry/sentry-javascript
- `SERVER_RAVEN_DSN`_(optional)_
  - More info here: https://github.com/getsentry/raven-node
- `RELEASE`_(optional)_
  - Release version used when sending exceptions to Sentry. Injected when building docker images
- `ENVIRONMENT`_(optional)_
  - When this isn't `production` there will be a big red development bar on the top of the page
- `HOST`_(optional)_
  - Used for binding port. Use `0.0.0.0` to make the server publicly accessible
- `PORT`_(optional)_
  - Port to bind
- `SSR_API_URL`_(optional)_
  - Same as `API_URL`, but used by the SSR. If this is empty, it will fallback to `API_URL`
- `HTTPS`_(optional)_
  - defaults to `false` Use <https://github.com/FiloSottile/mkcert> to generate certs for localhost: `mkcert -install && mkcert localhost`
  - `https` is required when using the payment request API.
- `HTTPS_CERT_KEY_FILE`_(optional)_
  - Filename to https cert key file. Defaults to localhost-cert
- `HTTPS_CERT_FILE`_(optional)_
  - Filename to https cert file. Defaults to localhost-cert

Default values can be found in `server/env.js` and `config/env.js`.

## Documentation

For simple component documentation we use
[react-docgen](https://github.com/reactjs/react-docgen), with
[react-styleguidist](https://github.com/styleguidist/react-styleguidist) for
easy style guide generation.

Start dev server (with hot reload), and go to
[localhost:6060](http://localhost:6060/).

```bash
$ yarn styleguide
```

To build a static version of the documentation, run:

```bash
$ yarn styleguide:build
```

## Prettier

We use [prettier](https://github.com/prettier/prettier) for JS auto-formatting.
When the code isn't formatted with the prettier version in `package.json`, the
tests will fail. We highly recommend using format on save via an editor plugin,
for example [prettier-atom](https://atom.io/packages/prettier-atom) and
[vim-prettier](https://github.com/prettier/vim-prettier).

You can also format the code via `yarn prettier`.

## Tests

### Unit tests (jest)

Run all the tests and check for lint errors with the command:

```bash
$ yarn test
```

For development you can run the tests continuously by using:

```bash
$ yarn test:watch
```

A coverage report can be generated by running `yarn test -- --coverage`.

### End to end tests (cypress)

In order to run end to end tests, you need to run both lego-webapp and lego.
Lego can be found here: https://github.com/webkom/lego. Lego is assumed to have a clean development database, follow the steps below to achieve that.

#### Backend

```bash
$ cd ../lego
$ docker-compose up -d # Start all services that lego depends on
$ python manage.py initialize_development # Initialize and load data sources (postgres)
$ docker-compose restart lego_cypress_helper # The cypress helper resets database between every test and might need this restart to function correctly
$ python manage.py runserver
```

#### Frontend

Start up the node server

```bash
$ yarn start
```

And start cypress in another terminal

```bash
$ yarn cypress open
```

**Alternative:** You can also run the node server with server side rendering enabled. This is how the tests are run on CI. To do this, you build and start the server

```bash
$ yarn build
$ yarn ssr
```

And you run cypress headlessly (no visible browser) in another terminal

```bash
yarn cypress run
```

## Flow

[Flow](https://flowtype.org/) is gradually being introduced so we can reap the
benefits of static type checking.

Run `flow` in the project directory to check if everything is good.

## Linting

ESLint and Stylelint is used to maintain high code quality and a unified code
style. Please run them before committing code.

To run the linter, use:

```bash
$ yarn run lint

# or
$ yarn run lint:js
$ yarn run lint:css
$ yarn run lint:prettier
```

Some ESLint errors can be fixed by running

```bash
$ yarn lint:js -- --fix
```

Some formatting errors reported by prettier can be fixed by running

```bash
$ yarn prettier
```

## Debugging

To debug chunk size (size of the javascript sent to the browser), run

```bash
$ BUNDLE_ANALYZER=true yarn build
```
