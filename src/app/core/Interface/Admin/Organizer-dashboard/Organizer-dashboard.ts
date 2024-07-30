export interface Organizer {
  message: string;
  statusCode: number;
  data: Data;
}

export interface Data {
  eventsHeldByOrganizer: number;
  sumOfAllAllocatedTicketsOfOrganizer: number;
  numberOfTicketsBoughtFromOrganizer: number;
  paymentsOfRevenueForOrganizer: number;
  bestSellingEventID: number;
  organizerTicketsLefts: number;
  ticketsSalesPercentage: number;
  monthlyRevenueData: MonthlyRevenueData;
  bestSellingDataMonthly: BestSellingDataMonthly;
  bestSellingDataWeekly: BestSellingDataWeekly;
  bestSellingDataDaily: BestSellingDataDaily;
}

export interface BestSellingDataDaily {
  ticketsSoldToday: number;
  ticketsSoldTodayLeft: number;
  eventHeldToday: number;
}

export interface BestSellingDataWeekly {
  ticketsSoldWeekly: number;
  ticketsSoldWeeklyLeft: number;
  eventHeldWeekly: number;
}

export interface BestSellingDataMonthly {
  ticketsSoldMonthly: number;
  ticketsSoldMonthlyLeft: number;
  eventHeldMonthly: number;
}

export interface MonthlyRevenueData {
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