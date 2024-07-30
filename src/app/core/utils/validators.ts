import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const SignupFormValidators = {
  fullName: [Validators.required, Validators.minLength(6), fullNameValidator()],
  email: [Validators.required, Validators.email],
  password: [Validators.required, Validators.minLength(8), passwordValidator()],
  confirmPassword: [Validators.required, Validators.minLength(8)],
  role: [Validators.required],
  gender: [Validators.required],
  dateOfBirth: [Validators.required, dateOfBirthValidator],
};

function dateOfBirthValidator(control: AbstractControl): { [key: string]: any } | null {
  if (control.value) {
    const dob = new Date(control.value);
    const today = new Date();
    const minAge = 12;
    const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

    if (dob > minDate) {
      return { 'minAge': true };
    }
  }
  return null;
}

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return { required: true };
    }

    const regex = /[^a-zA-Z\s]/;
    if (regex.test(value)) {
      return {
        fullNameError:
          'Full name must not contain numbers or special characters',
      };
    }

    const parts = value.trim().split(/\s+/);
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      return {
        fullNameError:
          'Full name must consist of two parts (first and last name)',
      };
    }

    return null;
  };
}


export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return { required: true };
    }

    if (!/[A-Z]/.test(value)) {
      return {
        passwordError: 'Password must contain at least one uppercase letter',
      };
    }
    if (!/[a-z]/.test(value)) {
      return {
        passwordError: 'Password must contain at least one lowercase letter',
      };
    }
    if (!/[0-9]/.test(value)) {
      return { passwordError: 'Password must contain at least one number' };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return {
        passwordError: 'Password must contain at least one special character',
      };
    }
    if (value.length < 8) {
      return { passwordError: 'Password must be at least 8 characters long' };
    }

    return null;
  };
}

export function matchPasswords(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(password);
    const confirmPasswordControl = formGroup.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['passwordMismatch']
    ) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}

export function dateRangeValidator(
  startDateControlName: string, 
  endDateControlName: string,
  startTimeControlName: string,
  endTimeControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const startDate = formGroup.get(startDateControlName)?.value;
    const endDate = formGroup.get(endDateControlName)?.value;
    const startTime = formGroup.get(startTimeControlName)?.value;
    const endTime = formGroup.get(endTimeControlName)?.value;

    if (!startDate || !endDate || !startTime || !endTime) {
      return null; 
    }

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const now = new Date();

    const timeDifference = end.getTime() - start.getTime();
    const fifteenMinutes = 15 * 60 * 1000;
    const oneYear = 365 * 24 * 60 * 60 * 1000;

    if (start < now) {
      return { dateTimeRangeError: 'Event start date and time must not be in the past'};
    }

    if (timeDifference <= fifteenMinutes) {
      return { dateTimeRangeError: 'Event end date and time must be at least 15 minutes after start date and time'};
    }

    if (timeDifference > oneYear) {
      return { dateTimeRangeError: 'Event duration should not exceed one year'};
    }

    return null;
  };
}
