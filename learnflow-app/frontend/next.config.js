/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable SWC transforms for better dynamic import handling
    swcPlugins: [],
  },
  // Handle dynamic imports properly
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Allow dynamic imports in client-side bundles
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        buffer: false,
        util: false,
      };
    }

    // Configure chunk splitting for better loading
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: 20,
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          chunks: 'all',
        },
        monaco: {
          test: /[\\/]node_modules[\\/]monaco-editor/,
          name: 'monaco',
          priority: 30,
          chunks: 'all',
        },
      },
    };

    return config;
  },
};

module.exports = nextConfig;