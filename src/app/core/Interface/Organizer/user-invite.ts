// invite-user.interface.ts
export interface InviteUserRequest {
  email: string;
  name: string;
}

export interface InviteUserResponse {
  success: boolean;
  message: string;
}
