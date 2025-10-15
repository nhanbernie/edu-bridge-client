const createEnvConfig = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000;
  return {
    API: { BASE_URL: baseUrl, TIMEOUT: timeout },
    PEER: {
      HOST: process.env.NEXT_PUBLIC_PEER_HOST || "localhost",
      PORT: Number(process.env.NEXT_PUBLIC_PEER_PORT) || 9000,
      PATH: process.env.NEXT_PUBLIC_PEER_PATH || "/",
      SECURE: process.env.NEXT_PUBLIC_PEER_SECURE === "true" || false,
    },
  };
};

export const ENV = createEnvConfig();
