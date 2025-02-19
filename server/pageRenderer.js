//@flow

import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import serialize from 'serialize-javascript';
import { ChunkExtractor } from '@loadable/server';
import config from '../config/env';
import webpackClient from '../config/webpack.client.js';
import type { State } from '../app/types';
import { selectCurrentUser } from 'app/reducers/auth';
import { isEmpty } from 'lodash';
import { helmetContext } from './ssr.js';

import manifest from '../app/assets/manifest.json';

const dllPlugin = __DEV__ ? '<script src="/vendors.dll.js"></script>' : '';

export type PageRendererProps = {
  app: ?React$Element<*>,
  state: State | {||},
};

const extractor = !__DEV__
  ? new ChunkExtractor({
      statsFile: path.join(webpackClient.outputPath, 'loadable-stats.json'),
      entrypoints: ['app'],
    })
  : null;

const readyHtml = (app) => {
  if (extractor) {
    const collectedApp = extractor.collectChunks(app);
    const body = renderToString(collectedApp);

    const scripts = extractor.getScriptTags();
    const styles = extractor.getStyleTags();
    const links = extractor.getLinkTags();

    return { body, scripts, styles, links };
  } else {
    const {
      app,
      vendors,
      js,
      styles: appStyles,
    } = JSON.parse(
      fs
        .readFileSync(
          path.join(webpackClient.outputPath, 'webpack-assets.json')
        )
        .toString()
    );

    const styles = [appStyles && appStyles.css]
      .filter(Boolean)
      .map((css) => `<link rel="stylesheet" href="${css}">`)
      .join('\n');
    const scripts = [
      ...[vendors && vendors.js, app && app.js, appStyles && appStyles.js && js]
        .filter(Boolean)
        .map((js) => `<script src="${js}"></script>`),
      `<script id="__LOADABLE_REQUIRED_CHUNKS__" type="application/json">[]</script>`,
      `<script id="__LOADABLE_REQUIRED_CHUNKS___ext" type="application/json">{"namedChunks":[]}</script>`,
    ].join('\n');

    return { body: '', scripts, styles, links: '' };
  }
};

export default function pageRenderer({
  app = undefined,
  state = {},
}: PageRendererProps = {}): string {
  const isSSR = app === undefined ? 'false' : 'true';
  const { helmet } = helmetContext;
  const selectedTheme: string =
    (!isEmpty(state) && selectCurrentUser(state).selectedTheme) || 'auto';
  const { body, scripts, styles, links } = readyHtml(app);

  return `
    <!DOCTYPE html>
    <html data-theme=${serialize(
      selectedTheme === 'auto' ? 'light' : selectedTheme
    )}>
      <head>
        <meta charset="utf-8">
        ${helmet ? helmet.title.toString() : ''}
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="theme-color" content="#f2f2f1">
        <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Abakus Søk">
        <link rel="icon" href="/icon-512x512.png" sizes="512x512"/>
        <link rel="apple-touch-icon" href="/icon-512x512.png" sizes="512x512"/>
        <link rel="icon" href="/icon-384x384.png" sizes="384x384"/>
        <link rel="apple-touch-icon" href="/icon-384x384.png" sizes="384x384"/>
        <link rel="icon" href="/icon-256x256.png" sizes="256x256"/>
        <link rel="apple-touch-icon" href="/icon-256x256.png" sizes="256x256"/>
        <link rel="icon" href="/icon-192x192.png" sizes="192x192"/>
        <link rel="apple-touch-icon" href="/icon-192x192.png" sizes="192x192"/>
        <link rel="icon" href="/icon-96x96.png" sizes="96x96"/>
        <link rel="apple-touch-icon" href="/icon-96x96.png" sizes="96x96"/>
        <link rel="icon" href="/icon-48x48.png" sizes="48x48"/>
        <link rel="apple-touch-icon" href="/icon-48x48.png" sizes="48x48"/>
        <link rel="manifest" href="${manifest}">

        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-title" content="Abakus"/>

        <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:700|Raleway|Roboto" rel="stylesheet">
        ${links}

        ${helmet ? helmet.meta.toString() : ''}

        ${styles}
      </head>
      <body>
      ${
        // If user has selected auto and device is in dark mode; ensure we update
        // the theme before first render to screen
        selectedTheme === 'auto'
          ? `<script>
          (function () {
            try {
              if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            } catch (e) {}
           })();
        </script>`
          : ''
      }
        <div id="root">${body}</div>
        <script>
           window.__CONFIG__ = ${serialize(config, { isJSON: true })};
           window.__PRELOADED_STATE__ = ${serialize(state, { isJSON: true })};
           window.__IS_SSR__ = ${isSSR};
        </script>
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        ${dllPlugin}
        ${scripts}
      </body>
    </html>
   `;
}
