export interface SignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface PageResponse {
  message: string;
  status: number;
  data?: {};
}

export interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
  message: string;
  userRole: string;
  fullName: string;
  userEmail: string;
  onboardingComplete: boolean;
  isCredentialsSubmitted: boolean;
  userId: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
