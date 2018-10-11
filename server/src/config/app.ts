export default {
  /**
   * JWT Secret
   */
  jwt_secret: process.env.JWT_SECRET,

  /**
   * Site name
   */
  site_name: 'Auth Boilerplate',

  /**
   * Base site URL without the trailing slash
   */
  site_url: 'http://localhost',

  /**
   * How long until email activation code expires
   */
  email_activation_expiry: 365 * 24 * 3600,

  /**
   * How long until password reset code expires
   */
  password_recovery_expiry: 24 * 3600,
};
