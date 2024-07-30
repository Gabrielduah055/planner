export interface AllEventdetails {
    organizerFullName: string;
    locationId: number;
    eventId: number;
    eventTitle: string;
    eventCategory: string;
    eventStartDate: string;
    eventEndDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventImageUrl: string;
    eventSummary: string;
    eventPrice: number;
    ticketType: string;
    ticketStatus: string;
    ticketQuantity: number;
    ticketTiers: string[];
    tags: string[];
    venueLocation: string;
    venueAddress1: string;
    venueAddress2: string;
    city: string;
    stateProvinceRegion: string;
    country: string;
    venueLayoutUrl: string;
    seatingTypeUrl: string;
    scheduleDate: string;
    scheduleTime: string;  
}
export interface allEventResponse{
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

export interface RegisteredEvents {
    content: AllEventdetails[];
    pageable: any;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: any;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
  
export interface FreeCheckoutData {
    fullName: string | null;
    email: string;
    phone: string;
}

export interface ViewEventdetails {
    organizerFullName: string
    organizerEmail: string
    locationId: number
    eventId: number
    eventTitle: string
    eventCategory: string
    eventStartDate: string
    eventEndDate: string
    eventStartTime: string
    eventEndTime: string
    eventImageUrl: string
    eventSummary: string
    eventPrice: number
    ticketType: string
    ticketStatus: string
    ticketTiers: TicketTier[]
    ticketQuantity: number
    tags: string[]
    venueLocation: string
    venueAddress1: string
    venueAddress2: string
    city: string
    stateProvinceRegion: string
    country: string
    venueLayoutUrl: string
    seatingTypeUrl: string
    organizerLogo: string
    scheduleDate: string
    scheduleTime: string
}

export interface TicketTier {
    ticketTierId: number
    name: string
    price: number
    allocation: number
    reserveAllocation: number
    discounts: number[]
}
export interface Discount {
    discountId: number
    discountVariable: string
    discountType: string
    discountValue: number
    discountRule: string
    conditionValue: string
}

export interface UpcomingEvents {
    organizerFullName: string
    organizerEmail: string
    locationId: number
    eventId: number
    eventTitle: string
    eventCategory: string
    eventStartDate: string
    eventEndDate: string
    eventStartTime: string
    eventEndTime: string
    eventImageUrl: string
    eventSummary: string
    tags: string[]
    venueLocation: string
    venueAddress1: string
    venueAddress2: string
    city: string
    stateProvinceRegion: string
    country: string
    venueLayoutUrl: string
    seatingTypeUrl: string
    organizerLogo: string
    ticketStatus: string
    ticketTiers: TicketTier[]
    scheduleDate: string
    scheduleTime: string
}

export interface AttendeeProfile {
    message: string;
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
}

export interface AreaOfInterest {
    name: string;
    selected: boolean;
    status: number;
}
  