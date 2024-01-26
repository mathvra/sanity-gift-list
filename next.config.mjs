/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    });

    return config;
  }
};

export default nextConfig;
