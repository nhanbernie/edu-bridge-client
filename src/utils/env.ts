const createEnvConfig = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000;
  return {
    API: { BASE_URL: baseUrl, TIMEOUT: timeout },
  };
};

export const ENV = createEnvConfig();
