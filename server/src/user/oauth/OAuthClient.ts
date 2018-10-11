import { OAuthProfile } from './OAuthProfile';

export class OAuthClient {
  async getProfile(provider: string, code: string): Promise<OAuthProfile> {
    throw new Error('Not implemented');

    return {
      id: '39842y394',
      displayName: 'Foo Bar',
    };
  }
}
