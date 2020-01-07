import favicon from '../components/favicon';

const defaultPageHead = '<title>Southbank Centre</title>';
// TODO Move this to the entry point (server/index.tsx)
// TODO Add it to express's app.locals
// TODO Curry in the app.locals here?
// See webpack-manifest-plugin
// Also see https://github.com/webpack/webpack/issues/4175
const manifest = __non_webpack_require__('./manifest.json');

interface TemplateArgs {
  body?: string;
  jsState?: {};
  head?: string;
}
export default function template({ body = '', jsState = {}, head = defaultPageHead }: TemplateArgs): string {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="${favicon}" />
      <link href="${manifest['main.css']}" rel="stylesheet" />
      ${head}
    </head>
    <body>
      <div id="root">${body}</div>
      <script type="text/javascript">var initialPageState = ${JSON.stringify(jsState)}</script>
      <script type="text/javascript" src="${manifest['main.js']}"></script>
    </body>
  </html>`;
}
