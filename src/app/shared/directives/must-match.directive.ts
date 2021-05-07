import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string, controlTestName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    const controlTest = formGroup.controls[controlTestName];

    // if (matchingControl.errors && !matchingControl.errors.mustMatch) {
    //   // return if another validator has already found an error on the matchingControl
    //   return;
    // }

    // set error on matchingControl if validation fails
    if (controlTest.value && control.value !== matchingControl.value) {
      matchingControl.markAsTouched();
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
