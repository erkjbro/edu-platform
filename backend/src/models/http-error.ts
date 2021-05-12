export default class HttpError extends Error {
  statusCode: number;
  constructor(public message: string, public errorCode: number) {
    super(message);
    this.statusCode = errorCode;
  }
}
