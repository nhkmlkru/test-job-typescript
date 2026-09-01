import { Injectable, type NestMiddleware } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export const apolloSandboxPlugin = ApolloServerPluginLandingPageLocalDefault({
  embed: true,
});

const GRAPHIQL_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>GraphiQL</title>
    <style>
      html, body, #graphiql { height: 100%; margin: 0; }
    </style>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/graphiql@3.8.3/graphiql.min.css" />
  </head>
  <body>
    <div id="graphiql">Loading…</div>
    <script src="https://unpkg.com/graphiql@3.8.3/graphiql.min.js"></script>
    <script>
      const fetcher = GraphiQL.createFetcher({ url: '/graphql' });
      ReactDOM.render(
        React.createElement(GraphiQL, { fetcher }),
        document.getElementById('graphiql'),
      );
    </script>
  </body>
</html>`;

function isLocalHost(host: string): boolean {
  const hostname = host.startsWith('[')
    ? host.slice(1, host.indexOf(']'))
    : (host.split(':')[0] ?? '');

  return ['localhost', '127.0.0.1', '::1'].includes(hostname.toLowerCase());
}

@Injectable()
export class GraphqlLandingPageMiddleware implements NestMiddleware {
  use(
    req: {
      method: string;
      headers: { host?: string; accept?: string; 'x-forwarded-proto'?: string };
      query: Record<string, unknown>;
    },
    res: { type: (contentType: string) => { send: (body: string) => void } },
    next: () => void,
  ): void {
    if (req.method !== 'GET' || req.query.query) {
      next();
      return;
    }

    if (!(req.headers.accept ?? '').includes('text/html')) {
      next();
      return;
    }

    const forwardedProto = (req.headers['x-forwarded-proto'] ?? '')
      .split(',')[0]
      .trim();
    const canEmbedSandbox =
      isLocalHost(req.headers.host ?? '') || forwardedProto === 'https';

    if (canEmbedSandbox) {
      next();
      return;
    }

    res.type('html').send(GRAPHIQL_HTML);
  }
}
