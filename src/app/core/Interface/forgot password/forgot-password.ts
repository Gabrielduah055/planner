export interface ForgotPassword {
  email: string;
}

export interface PasswordResetResponse {
  status: number;

}

export interface BusinessError {
  businessErrorDescription: string;
}

export interface ErrorResponse {
  error: BusinessError;

}
