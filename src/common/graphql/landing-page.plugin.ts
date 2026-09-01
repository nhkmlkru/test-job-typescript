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

type HeaderValue = string | string[] | undefined;

function headerValue(value: HeaderValue): string {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
}

function hostnameFromHost(host: string): string {
  const hostname = host.startsWith('[')
    ? host.slice(1, host.indexOf(']'))
    : (host.split(':')[0] ?? '');

  return hostname.toLowerCase();
}

function isLocalHost(host: string): boolean {
  return ['localhost', '127.0.0.1', '::1'].includes(hostnameFromHost(host));
}

function isIpv4Address(hostname: string): boolean {
  return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname);
}

function requestProtocol(headers: {
  'x-forwarded-proto'?: HeaderValue;
  forwarded?: HeaderValue;
}): string {
  const forwardedProto = headerValue(headers['x-forwarded-proto'])
    .split(',')[0]
    .trim()
    .toLowerCase();

  if (forwardedProto) {
    return forwardedProto;
  }

  const forwarded = headerValue(headers.forwarded).match(/proto=([^;,\s]+)/i);

  return forwarded?.[1]?.toLowerCase() ?? '';
}

function canEmbedSandbox(
  host: string,
  headers: {
    'x-forwarded-proto'?: HeaderValue;
    forwarded?: HeaderValue;
  },
): boolean {
  if (isLocalHost(host)) {
    return true;
  }

  const hostname = hostnameFromHost(host);

  if (hostname.endsWith('.railway.app')) {
    return true;
  }

  const proto = requestProtocol(headers);

  if (proto === 'https') {
    return true;
  }

  if (proto === 'http') {
    return false;
  }

  return hostname.includes('.') && !isIpv4Address(hostname);
}

@Injectable()
export class GraphqlLandingPageMiddleware implements NestMiddleware {
  use(
    req: {
      method: string;
      headers: {
        host?: HeaderValue;
        accept?: HeaderValue;
        'x-forwarded-proto'?: HeaderValue;
        forwarded?: HeaderValue;
      };
      query: Record<string, unknown>;
    },
    res: { type: (contentType: string) => { send: (body: string) => void } },
    next: () => void,
  ): void {
    if (req.method !== 'GET' || req.query.query) {
      next();
      return;
    }

    if (!headerValue(req.headers.accept).includes('text/html')) {
      next();
      return;
    }

    if (canEmbedSandbox(headerValue(req.headers.host), req.headers)) {
      next();
      return;
    }

    res.type('html').send(GRAPHIQL_HTML);
  }
}
