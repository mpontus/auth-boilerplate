/**
 * Site configuration which is most likely to be changed
 */
export default {
  /**
   * Website domain name excluding schema
   */
  domain_name: 'localhost:3000',

  /**
   * Website display name
   */
  site_name: 'Auth Boilerplate',

  /**
   * Base front-end url
   */
  get site_url(): string {
    return `http://${this.domain_name}`;
  },

  /**
   * Value of the "From:" field in transactional emails
   */
  get email_sender(): string {
    return `${this.site_name} <noreply@${this.domain_name}>`;
  },

  /**
   * Email activation url pattern
   */
  get email_activation_url(): string {
    return `${this.site_url}/email_activation?code=%s`;
  },

  /**
   * Password recovery url pattern
   */
  get password_recovery_url(): string {
    return `${this.site_url}/password_recovery?code=%s`;
  },
};
