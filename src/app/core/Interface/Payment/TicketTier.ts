interface AdditionalInformation {
    description: string;
}

export interface TicketTier {
    ticketTierId: number;
    ticketName: string;
    ticketType: string;
    ticketQuantity: number;
    price: number;
    discountType: string;
    discountValue: number;
    conditionValue: number;
    ticketQuantityDiscountCondition: number;
    additionalInformation: AdditionalInformation[];
}