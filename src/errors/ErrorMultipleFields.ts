export class ErrorMultipleFields extends Error {
  private errors_: string[];
  constructor(errors: string[], message: string = 'Error in validate') {
    super(message);

    this.errors_ = errors;

    this.name = 'ErrorMultipleFields';
  }

  getFields() {
    return this.errors_;
  }
}