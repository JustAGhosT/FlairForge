export class ErrorHandler {
  static handle(error: unknown, context: string): void {
    if (error instanceof Error) {
      console.error(`[${context}]`, error);
      this.showUserError(error.message);
    } else {
      console.error(`[${context}]`, error);
      this.showUserError('An unexpected error occurred.');
    }
    // TODO: Integrate with error tracking service (e.g., Sentry) if needed
  }

  static showUserError(message: string): void {
    // Replace with a better UI notification if available
    alert(message);
  }
} 