import { AttendeeSettingsComponent } from './core/components/Dashboard/Attendee/attendee-settings/attendee-settings.component';
import { UsersAdminComponent } from './core/components/Dashboard/Admin/users-admin/users-admin.component';
import { Routes } from '@angular/router';
import { RegistrationComponent } from './core/components/registration/registration.component';
import { LoginComponent } from './core/components/login/login.component';
import { ForgotPasswordComponent } from './core/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { HomeComponent } from './core/components/home/home.component';
import { DashboardComponent } from './core/components/Dashboard/Organizer/Dashboard/dashboard/dashboard.component';
import { EventComponent } from './core/components/Dashboard/Organizer/Event/event/event.component';
import { CreateEventComponent } from './core/components/create-event/create-event.component';
import { TokenComponent } from './core/components/token/token.component';
import { authGuard } from './core/guards/organizer/auth-guard.guard';
import { adminGuard } from './core/guards/admin/admin.guard';
import { UserInviteComponent } from './core/components/Dashboard/Organizer/users/user-invite/user-invite.component';
import { SettingsComponent } from './core/components/Dashboard/Organizer/settings/settings.component';
import { DashboardAdminComponent } from './core/components/Dashboard/Admin/dashboard-admin/dashboard-admin.component';
import { EventsAdminComponent } from './core/components/Dashboard/Admin/events-admin/events-admin.component';
import { SettingsAdminComponent } from './core/components/Dashboard/Admin/settings-admin/settings-admin.component';
import { CreateEventAdminComponent } from './core/components/Dashboard/Admin/create-event-admin/create-event-admin.component';
import { CreateEventSuccessComponent } from './shared/create-event-success/create-event-success.component';
import { UserPaginationComponent } from './shared/Organizer/pagination/user-pagination.component';
import { AttendeeEventComponent } from './core/components/Dashboard/Attendee/attendee-home/attendee-event.component';
import { AttendeePreviewEventComponent } from './core/components/Dashboard/Attendee/attendee-preview-event/attendee-preview-event.component';
import { BusinessInfoComponent } from './core/components/Dashboard/Organizer/business-info/business-info.component';
import { BusinessInfoSucessComponent } from './shared/business-info-sucess/business-info-sucess.component';
import { UsersComponent } from './core/components/Dashboard/Organizer/users/users.component';
import { AttendeeMyEventsComponent } from './core/components/Dashboard/Attendee/attendee-my-events/attendee-my-events.component';
import { AttendeePopularEventsComponent } from './shared/attendee-popular-events/attendee-popular-events.component';
import { AdminOrganizerDetailComponent } from './shared/admin-organizer-detail/admin-organizer-detail.component';
import { AdminPaymentIntegrationComponent } from './shared/admin-payment-integration/admin-payment-integration.component';
import { AdminViewAttendeesComponent } from './shared/admin-view-attendees/admin-view-attendees.component';
import { AdminVieweventdetailsComponent } from './shared/admin-vieweventdetails/admin-vieweventdetails.component';
import { AttendeeFreeCheckoutComponent } from './shared/attendee-free-checkout/attendee-free-checkout.component';
import { AttendeePaymentCheckoutComponent } from './shared/attendee-payment-checkout/attendee-payment-checkout.component';
import { AttendeePaymentCheckoutTicketTypeComponent } from './shared/attendee-payment-checkout-ticket-type/attendee-payment-checkout-ticket-type.component';
import { AttendeeOnboardingStep1Component } from './shared/attendee-onboarding-step1/attendee-onboarding-step1.component';
import { AttendeeOnboardingStep2Component } from './shared/attendee-onboarding-step2/attendee-onboarding-step2.component';
import { AttendeeOnboardingStep3Component } from './shared/attendee-onboarding-step3/attendee-onboarding-step3.component';
import { AttendeeGuard } from './core/guards/attendee/attendee.guard';
import { UnapprovedOrganizerComponent } from './core/components/unapproved-organizer/unapproved-organizer.component';
import { OrganizerPreviewPageComponent } from './core/components/Dashboard/Organizer/organizer-preview-page/organizer-preview-page.component';
import { EventAttendeesComponent } from './core/components/Dashboard/Organizer/event-attendees/event-attendees.component';


export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pagination', component: UserPaginationComponent },
  { path: 'login', component: LoginComponent },

  { path: 'signup', component: RegistrationComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'org-dash', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'org-event', component: EventComponent, canActivate: [authGuard] },
  { path: 'org-event-attendees', component: EventAttendeesComponent, canActivate: [authGuard] },
  { path: 'org-create-event', component: CreateEventComponent, canActivate: [authGuard] },
  { path: 'org-update-event/:eventId', component: CreateEventComponent, canActivate: [authGuard] },
  { path: 'org-view-attendees/:eventId', component: AdminViewAttendeesComponent },
  { path: 'org-users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'org-settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'org-preview-page', component: OrganizerPreviewPageComponent, canActivate: [authGuard] },
  { path: 'org-business-info', component: BusinessInfoComponent },
  { path: 'org-unapproved', component: UnapprovedOrganizerComponent },
  { path: 'create-event-success', component: CreateEventSuccessComponent, canActivate: [authGuard] },
  { path: 'business-info-sucess', component: BusinessInfoSucessComponent, canActivate: [authGuard] },
  { path: 'admin-dash', component: DashboardAdminComponent, canActivate: [adminGuard] },
  { path: 'admin-event', component: EventsAdminComponent, canActivate: [adminGuard] },
  { path: 'admin-create-event', component: CreateEventAdminComponent, canActivate: [adminGuard] },
  { path: 'admin-users', component: UsersAdminComponent, canActivate: [adminGuard] },
  { path: 'view-organizer-credentials/:id', component: AdminOrganizerDetailComponent },
  { path: 'admin-settings', component: SettingsAdminComponent, canActivate: [adminGuard] },
  { path: 'admin-view-attendees/:eventId', component: AdminViewAttendeesComponent },
  { path: 'admin-viewevent/:eventId', component: AdminVieweventdetailsComponent },
  { path: 'payment-integration', component: AdminPaymentIntegrationComponent },
  { path: 'reset-password-token', component: TokenComponent },
  { path: 'user-invite', component: UserInviteComponent },

  { path: 'attendee-home',
    component: AttendeeEventComponent,
    canActivate: [AttendeeGuard]
  },
  { path: 'onboarding-step1', component: AttendeeOnboardingStep1Component },
  { path: 'onboarding-step2', component: AttendeeOnboardingStep2Component, canActivate: [AttendeeGuard] },
  { path: 'onboarding-step3', component: AttendeeOnboardingStep3Component, canActivate: [AttendeeGuard] },

  {
    path: 'my-events',
    component: AttendeeMyEventsComponent
  },
  {
    path: 'attendee-preview/:eventId',
    component: AttendeePreviewEventComponent
  },
  {
    path: 'attendee-popularevents',
    component: AttendeePopularEventsComponent
  },
  {
    path: 'attendee-free-checkout/:eventId',
    component: AttendeeFreeCheckoutComponent
  },
  {
    path: 'attendee-payment/:eventId',
    component: AttendeePaymentCheckoutComponent
  },
  {
    path: 'attendee-settings',
    component: AttendeeSettingsComponent
  },
  {
    path: 'attendee-payment-ticket-type/:eventId',
    component: AttendeePaymentCheckoutTicketTypeComponent
  },

];
