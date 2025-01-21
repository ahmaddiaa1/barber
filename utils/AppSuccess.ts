export class AppSuccess {
  data?: any;
  message?: string;
  statusCode?: number;

  constructor(data: any, message: string, statusCode?: 201) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}
