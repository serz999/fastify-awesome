declare namespace NodeJS {
    interface ProcessEnv {
      // Fastify options
      PORT: string;
      HOST: string;
      LOGGER: string;

      // Database options
      DB_URI: string;
  }
}
  