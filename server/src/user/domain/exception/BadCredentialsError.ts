export class BadCredentialsError extends Error {
  constructor() {
    super('Bad credentials');

    this.name = 'BadCredentialsError';
  }
}
