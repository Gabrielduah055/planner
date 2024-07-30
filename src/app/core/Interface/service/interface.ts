export interface OrgSettingsRequest {

  name: string;
  description: string;
}

export interface OrgSettingsResponse {
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
}

export interface ViewProfileResponseData {
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
}

export interface ViewProfileResponse {
  data: ViewProfileResponseData;
}
