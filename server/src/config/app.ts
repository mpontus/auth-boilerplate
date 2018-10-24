/**
 * Site configuration which is most likely to be changed
 */
export default {
  /**
   * Base front-end URL
   */
  site_url: `${process.env.PUBLIC_URL}`,

  /**
   * Website display name
   */
  site_name: 'Auth Boilerplate',

  /**
   * This will be included in the `Form: ` header of outgoing emails
   */
  get email_sender(): string {
    return `${this.site_name} <noreply@mx.mpontus.me>`;
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
