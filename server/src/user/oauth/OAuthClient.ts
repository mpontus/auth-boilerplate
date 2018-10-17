import { OAuthProfile } from "./OAuthProfile";

export class OAuthClient {
  public async getProfile(_provider: string, _code: string): Promise<OAuthProfile> {
    throw new Error("Not implemented");

    return {
      id: "39842y394",
      displayName: "Foo Bar",
    };
  }
}
