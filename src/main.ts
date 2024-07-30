import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { GlobalErrorHandlerService } from './app/core/services/global-errorHandler';
import { inject } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideClientHydration(), ...appConfig.providers],
}).catch((err) => {
  const globalErrorHandler = inject(GlobalErrorHandlerService);
  globalErrorHandler.handleError(err);
});
