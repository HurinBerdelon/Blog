import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
    { ignores: ["e2e/**"] },
    ...nextConfig,
];

export default config;
