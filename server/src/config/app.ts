import { ConfigService } from 'nestjs-config';

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
  site_url(this: ConfigService) {
    return `http://${this.get('domain_name')}`;
  },

  /**
   * Value of the "From:" field in transactional emails
   */
  email_sender(this: ConfigService) {
    return `${this.get('site_name')} <noreply@${this.get('domain_name')}>`;
  },
};
