import path from 'path';

const nextConfig = {
  // Evita o warning de “workspace root” e “output tracing”
  turbopack: { root: path.join(process.cwd()) },
  outputFileTracingRoot: path.join(process.cwd()),

  async rewrites() {
    return [
      // DEV/PROD local: proxy para o backend (Express) na 3000
      { source: '/api/:path*', destination: 'http://localhost:3000/api/:path*' },
      // Em Docker, troque o destino para http://backend:3000/api/:path*
    ];
  },
};

export default nextConfig;
