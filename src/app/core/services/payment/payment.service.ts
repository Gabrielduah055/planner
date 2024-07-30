import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentRequestType, PaymentResponseType } from '../../Interface/Payment/Payment';
import { TicketTier } from '../../Interface/Payment/TicketTier';
import { TicketTierWithDiscountsObject } from '../../Interface/create-event/organizer';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  base_url = environment.BASE_URL
  token = localStorage.getItem('Token')

  constructor(private httpClient: HttpClient) { }

  public verifyPayment(data: PaymentRequestType):Observable<HttpResponse<PaymentResponseType>>{
    return this.httpClient.post<PaymentResponseType>(
      this.base_url + '/payment/verify-payment',  data,
      { observe: 'response' }
    );
  }

  public getTicketTier(eventId: string, userId: string):Observable<TicketTier[]>{
    return this.httpClient.get<TicketTier[]>(
      this.base_url + `/attendee/get-ticket-tiers?eventId=${eventId}&userId=${userId}`
    );
  }
}
