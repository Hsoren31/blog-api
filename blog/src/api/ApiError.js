export class ApiError extends Error {
  constructor(message, status, fieldErrors = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}
