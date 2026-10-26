import nextConfig from "eslint-config-next/core-web-vitals";

export default [
    { ignores: ["e2e/**"] },
    ...nextConfig,
];
