export interface PaystackPop {
  setup(options: PaystackPopOptions): {
    openIframe: () => void;
  };
}

interface PaystackPopOptions {
  key: string;
  email: string;
  amount: number;
  currency: string;
  channels: string[];
  callback: (response: PaystackResponse) => void;
}

export interface PaystackResponse {
  reference: string;
}

export interface PaymentResponseType {
  id: string;
  userId: number;
  eventId: number;
  reference: string;
  amount: number;
  customerEmail: string;
  currency: string;
  cardType: string;
  mobileMoneyNumber: string;
  bank: string;
  brand: string;
  channel: string;
  transactionDate: string;
}

export class PaymentRequestType {
    eventId: string;
    ticketTierId: number;
    quantityBought: number;
    userId: string;
    reference: string;
    phoneNumber: string;
  
    constructor(eventId: string, ticketTierId: number, quantityBought: number, userId: string, reference: string, phoneNumber: string) {
      this.eventId = eventId;
      this.ticketTierId = ticketTierId;
      this.quantityBought = quantityBought;
      this.userId = userId;
      this.reference = reference;
      this.phoneNumber = phoneNumber;
    }
  }
  