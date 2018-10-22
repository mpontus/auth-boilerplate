/**
 * Site configuration which is most likely to be changed
 */
export default {
  /**
   * Website domain name excluding schema
   */
  domain_name: 'localhost',

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
};
