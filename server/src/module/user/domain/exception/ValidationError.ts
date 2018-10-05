export class ValidationError extends Error {
  public readonly fields: { [key: string]: string };

  constructor(fields: { [key: string]: string }) {
    super('Validation error');

    this.name = 'ValidationError';
    this.fields = fields;
  }
}
