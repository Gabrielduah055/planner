export interface Recent {
  content: Event[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface Event {
  organizerFullName: string;
  organizerEmail: string;
  locationId: number | null;
  eventId: number;
  eventTitle: string;
  eventCategory: string;
  eventType: string;
  moderatorMeeetingLink: string | null;
  attendeeInviteLink: string | null;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventImageUrl: string;
  eventSummary: string;
  tags: string[];
  venueLocation: string | null;
  venueAddress1: string | null;
  venueAddress2: string | null;
  city: string | null;
  stateProvinceRegion: string | null;
  country: string | null;
  venueLayoutUrl: string | null;
  seatingTypeUrl: string | null;
  organizerLogo: string;
  ticketStatus: string;
  ticketTiers:TicketTier[];
  totalTicketAllocation: number;
  scheduleDate: string | null;
  scheduleTime: string | null;
  attendeeImages: string | null;
  virtualEventPrice: number | null;
}

export interface TicketTier {
  ticketTierId: number;
  name: string;
  price: number;
  allocation: number;
  reserveAllocation: number;
  discounts: Discount[];
}

export interface Discount {
  discountId: number;
  discountVariable: string;
  discountType: string;
  discountValue: number;
  discountRule: string;
  conditionValue: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}