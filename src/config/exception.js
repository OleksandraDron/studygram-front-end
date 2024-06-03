export class ServerError extends Error {
  timestamp;
  message;
  status;

  constructor(error) {
    super(error?.message || "Unknown Server Error");
    this.timestamp = error?.timestamp || new Date().toISOString();
    this.message = error?.message || "Unknown Server Error";
    this.status = error?.status || 500;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export function handleServerError(error) {
  if (error instanceof ServerError) {
    return {
      message: error.message,
      timestamp: error.timestamp,
      status: error.status,
    };
  }

  const serverError = new ServerError(error);
  return {
    message: serverError.message,
    timestamp: serverError.timestamp,
    status: serverError.status,
  };
}
