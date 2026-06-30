const createEnvConfig = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://edubridge-api-dqdwefgzh2gbgud2.eastasia-01.azurewebsites.net";
  const timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 10000;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "https://edubridge.edu.vn");

  return {
    API: { BASE_URL: baseUrl, TIMEOUT: timeout },
    SITE: {
      URL: siteUrl,
      DOMAIN: siteUrl.replace(/^https?:\/\//, ""),
    },
    PEER: {
      HOST: process.env.NEXT_PUBLIC_PEER_HOST || "localhost",
      PORT: Number(process.env.NEXT_PUBLIC_PEER_PORT) || 9000,
      PATH: process.env.NEXT_PUBLIC_PEER_PATH || "/",
      SECURE: process.env.NEXT_PUBLIC_PEER_SECURE === "true" || false,
    },
    TLDRAW: {
      LICENSE_KEY: process.env.NEXT_PUBLIC_TLDRAW_LICENSE_KEY || "",
    },
  };
};

export const ENV = createEnvConfig();
