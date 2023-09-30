import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPasswordMatch(controlName: string, matchingControlName:string) {
    return function (formGroup: FormGroup) {
        const passControl = formGroup.controls[controlName];
        const confirmPassControl = formGroup.controls[matchingControlName];

        if(passControl.value !== confirmPassControl.value) {
            confirmPassControl.setErrors({confirmPassMatch:true});
            return { confirmPassMatch:true };
        } else {
            return null;
        }
    }
}