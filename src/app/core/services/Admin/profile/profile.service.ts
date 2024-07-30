import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminProfile } from '../../../Interface/Admin/getAllUsers';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileSource = new BehaviorSubject<AdminProfile | null>(this.loadProfileFromLocalStorage());
  profile$ = this.profileSource.asObservable();

  updateProfile(profile:AdminProfile):void {
    this.profileSource.next(profile);
    this.saveProfileToLocalStorage(profile);
  }

  getProfile():AdminProfile | null {
    return this.profileSource.getValue();
  }

  private saveProfileToLocalStorage(profile:AdminProfile):void {
    localStorage.setItem('adminProfile', JSON.stringify(profile));
  }

  private loadProfileFromLocalStorage():AdminProfile | null {
    const profileData = localStorage.getItem('adminProfile');
    return profileData ? JSON.parse(profileData) :null;
  }
  
}
