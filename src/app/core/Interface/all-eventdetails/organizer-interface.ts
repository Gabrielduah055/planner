export interface Event {

  id: string;
  name: string;
  date: string;
  location: string;

}

export interface Record {

  id: number;
  eventImageUrl: string;
  organizerLogo: string;
  description: string;
  eventTitle: string;
  eventSummary: string;
  venueLocation: string;
  eventStartDate: string;
  eventPrice: number;
  amount: number;
}

export interface DecodedToken {

  userId: string;
  role: string;
  exp: number;
  
}

export interface ApiResponse {

  success: boolean;
  data: Record[];
}

export interface FilterChangeEvent {
  target: {
    value: string;
  };
}
