import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordMatch } from 'src/app/utils/custom-validators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  userForm: FormGroup;
  showPassword: boolean = false;
  
  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      //Ingresamos los diferentes campos de nuestro formulario
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.max(40)
      ]),
      email: ['', [
        Validators.required,
        Validators.email
      ]], //Otra forma de obtener el formControl
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: ['', [
        Validators.required
      ]],
    }, { validator: confirmPasswordMatch('password','confirmPassword')});
  }

  onSubmit():void {

    if(this.userForm.invalid) {
      alert("Formulario Inválido");
    } else {
      alert("Enviado!")
    }
  }

  get nameControl() {
    return this.userForm.controls['name'];
  }

  get emailControl() {
    return this.userForm.controls['email'];
  }

  get passwordControl() {
    return this.userForm.controls['password'];
  }

  get confirmPasswordControl() {
    return this.userForm.controls['confirmPassword'];
  }

  get nameErrorMessage(): string {
    let controlErrors = this.nameControl.errors;
    if(controlErrors?.['required']){
      return 'El nombre es requerido';
    } else if(controlErrors?.['minlength']) {
      return `El nombre ingresado es inválido. Debe contener al menos ${controlErrors['minlength']['requiredLength']} caracteres`;
    } else {
      return '';
    }
  }

  get emailErrorMessage(): string {
    let controlErrors = this.emailControl.errors;
    if(controlErrors?.['required']){
      return 'El email es requerido';
    } else if(controlErrors?.['email']) {
      return `El email ingresado es inválido.`;
    } else {
      return '';
    }
  }

  get passwordErrorMessage(): string {
    let controlErrors = this.passwordControl.errors;
    if(controlErrors?.['required']){
      return 'El nombre es requerido';
    } else if(controlErrors?.['minlength']) {
      return `La contraseña ingresada es inválida. Debe contener al menos ${controlErrors['minlength']['requiredLength']} caracteres`;
    } else {
      return '';
    }
  }

  get confirmPasswordErrorMessage(): string {
    let controlErrors = this.confirmPasswordControl.errors;

    if(controlErrors?.['required']){
      return "La confirmación es requerida";
    } else if(controlErrors?.['confirmPassMatch']){
      return "Las contraseñas no coinciden";
    } else {
      return '';
    }
  } 
}
