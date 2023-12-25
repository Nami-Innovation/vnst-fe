module.exports = {
  apps: [
    {
      name: 'vnst-web',
      script: 'yarn start',
      max_memory_restart: '2G',
      env: {
        // NODE_ENV: "development",
        PORT: 3002,
      },
      env_staging: {
        // NODE_ENV: "staging",
        PORT: 3002,
      },
    },
  ],
};
