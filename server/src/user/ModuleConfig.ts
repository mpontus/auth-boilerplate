export class ModuleConfig {
  public readonly databaseUrl: string = "";
  public readonly googleClientId: string = "";
  public readonly googleClientSecret: string = "";
  public readonly googleCallbackUrl: string = "";

  constructor(options: Partial<ModuleConfig>) {
    Object.assign(this, options);
  }
}
