export class CustomError extends Error {
  title: string;

  constructor(title: string, message: string) {
    super(message); // Pass message to the base Error class
    this.title = title; // Setting a custom title for sonner-toast
  }
}
