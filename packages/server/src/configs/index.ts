interface Config {
  jwtSecret: string;
}

const config: Config = {
  jwtSecret: process.env.JWT_SECRET ?? '',
};

if (!config.jwtSecret) {
  throw new Error('JWT_SECRET 누락!');
}

export default config;
