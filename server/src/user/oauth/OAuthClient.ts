import { OAuthProfile } from './OAuthProfile';

/**
 * OAuth Client
 *
 * Responsbile for retrieving user profiles from 3-rd party networks
 */
export class OAuthClient {
  /**
   * Retrieve user profile from given provider
   */
  public async getProfile(
    _provider: string,
    _code: string,
  ): Promise<OAuthProfile> {
    throw new Error('Not implemented');

    return {
      id: '39842y394',
      displayName: 'Foo Bar',
    };
  }
}
