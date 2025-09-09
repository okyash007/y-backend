import { IApiResponse } from '../types/index.js';

export class ApiResponse<T = any> implements IApiResponse<T> {
  public statusCode: number;
  public data: T;
  public message: string;
  public success: boolean;
  [key: string]: any;

  constructor(statusCode: number, data: T, message: string = "Success", randomFields: Record<string, any> = {}) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = true;
    
    // Add any random/custom fields to the response
    if (randomFields && typeof randomFields === 'object') {
      Object.keys(randomFields).forEach(key => {
        // Avoid overwriting existing properties
        if (!this.hasOwnProperty(key)) {
          this[key] = randomFields[key];
        }
      });
    }
  }
}
