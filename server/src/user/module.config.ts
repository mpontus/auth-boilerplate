interface IModuleConfig {
  googleClientId: string;
  googleClientSecret: string;
  googleCallbackUrl: string;
}

export class ModuleConfig implements IModuleConfig {
  public readonly googleClientId;
  public readonly googleClientSecret;
  public readonly googleCallbackUrl;

  constructor(options: IModuleConfig) {
    Object.assign(this, options);
  }
}
