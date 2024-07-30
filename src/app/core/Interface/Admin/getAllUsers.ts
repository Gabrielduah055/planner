import { AllEventdetails } from "../all-eventdetails/all-eventdetails";

export type UserRole = 'ADMIN' | 'CO-ORGANIZER';

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}
export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
}

export interface ContentItem {
    id: number;
    fullName: string; 
    email: string; 
    profileImageUrl: string; 
    approvalStatus: string; 
    role: string; 
    enabled: boolean; 
    statusText: string; 
}

export interface Data {
    content: ContentItem[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort; 
    totalElements: number;
    totalPages: number;
}

export interface AllUsersResponse {
    message: string;
    statusCode: number;
    data: {
      content: ContentItem[];
      totalElements: number;
      totalPages: number;
      statusText: string; 
    };
}

export interface ResendTokenActivation{
    message: string;
}
export interface AdminProfile {
    message: string;
    status: number;
    email: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
    
}
export interface adminAllEventResponse{
    content:AllEventdetails[];
    empty:boolean;
    first:boolean;
    last:boolean;
    number:number;
    numberOfElements:number;  
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
          sorted: boolean;
          empty: boolean;
          unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
      };
}

export interface OrganizerProfileInformation {
    statusCode: number;
    message: string;
    status: number;
    data: {
        approvalStatus: string; 
        userId: string;
        description: string;
        organizationCertificate: string;
        organizationEmailAddress: string;
        organizationLogo: string;
        organizationName: string;
        organizationWebsite: string;
        statusText: string;
    };
}

export interface InviteData {
    fullName: string;
    email: string;
    role: UserRole;
}

export interface AllUsersEvent {
    empty: boolean;
    first: boolean
    last: boolean;
    number: number
    numberOfElements: number;
    totalElements: number;
    totalPages: number
    size: number
    Pageable: {
        pageNumber: number
        pageSize: number
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        };
        offset: number
        paged: boolean
        unpaged: boolean  
    }
}
  
export interface AdminViewAttendeesByE {
    attendeeId: number
    profileImageUrl: string
    name: string
    email: string
    phoneNumber: string
    registrationDate: string
    event_id: number
    age: number
    gender: string
    user_id: number
    country: string
    ticketPaymentStatus: string
    ticketQuantity: string
    ticketType: string
    ticketQuantityToSell: string
}

export interface AttendeesResponse {
  content: AdminViewAttendeesByE[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
  Pageable: {
        pageNumber: number
        pageSize: number
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        };
        offset: number
        paged: boolean
        unpaged: boolean  
    }
}


  

  

