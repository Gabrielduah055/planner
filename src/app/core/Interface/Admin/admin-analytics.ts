export interface Analytics {
  numberOfAllUsers: number;
  regularUsers: number;
  numberOfAttendees: number;
  numberOfOrganizers: number;
  numberOfRegisteredAttendeesInCurrentMonth: number;
  numberOfRegisteredOrganizersInCurrentMonth: number;
  totalEventsCreated: number;
  totalOrganizersActive: number;
  totalAttendeesActive: number;
  sumOfAttendeesAndOrganizers: number;
  currentYearData: CurrentYearData;
  attendeePercentage: number;
  organizerPercentage: number;
  totalTicketsEverSold: number;
  allRevenueMade: number;
  allAllocatedTickets: number;
  percentageSold: number;
  dailySoldTickets: number;
}

export interface CurrentYearData {
  attendees: Attendees;
  organizers: Attendees;
}

export interface Attendees {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}