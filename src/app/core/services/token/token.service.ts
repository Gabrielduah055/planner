import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';

const ACCESS_TOKEN = 'Token';
const REFRESH_TOKEN = 'refresh_token';
const CODE_VERIFIER = 'code_verifier';
const USER_INFO_KEY = 'user_info';
const TOKEN_ENCRYPTION_KEY = environment.TOKEN_ENCRYPTION_KEY;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenUrl = environment.TOKEN_URL;

  constructor(private httpClient: HttpClient) {}

  sendTokenData(data: any): Observable<any> {
    return this.httpClient.post<any>(this.tokenUrl, data);
  }

  setTokens(access_token: string, refresh_token: string): void {
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.setItem(ACCESS_TOKEN, this.encryptToken(access_token));
    sessionStorage.removeItem(REFRESH_TOKEN);
    sessionStorage.setItem(REFRESH_TOKEN, this.encryptToken(refresh_token));
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('Token');
  }

  getRefreshToken(): string | null {
    const token = sessionStorage.getItem(REFRESH_TOKEN);
    return token ? this.decryptToken(token) : null;
  }

  isLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }

  getUserId(): string {
    const token = this.getAccessToken();
    if (token === null) {
      return '';
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const values = JSON.parse(decodedPayload);
    return values.userId;
  }

  getEmail(): string {
    const token = this.getAccessToken();
    if (token === null) {
      return '';
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const values = JSON.parse(decodedPayload);
    return values.sub;
  }

  getFullName(): string {
    const token = this.getAccessToken();
    if (token === null) {
      return '';
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const values = JSON.parse(decodedPayload);
    return values.fullName;
  }

  getUserRole(): string {
    const token = this.getAccessToken();
    if (token === null) {
      return '';
    }
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const values = JSON.parse(decodedPayload);
    return values.userRole;
  }

  clear(): void {
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(REFRESH_TOKEN);
    sessionStorage.removeItem(USER_INFO_KEY);
    sessionStorage.clear();
    localStorage.clear();
  }

  private encryptToken(token: string): string {
    return CryptoJS.AES.encrypt(token, TOKEN_ENCRYPTION_KEY).toString();
  }

  private decryptToken(token: string): string {
    const bytes = CryptoJS.AES.decrypt(token, TOKEN_ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
