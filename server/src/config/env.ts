/**
 * Environment configuration
 */
export default {
  /**
   * Database server connection string
   */
  database_url: process.env.DATABASE_URL,

  /**
   * SMTP server connection string
   */
  smtp_url: process.env.SMTP_URL,

  /**
   * Redis server connection string
   */
  redis_url: process.env.REDIS_URL,
};
