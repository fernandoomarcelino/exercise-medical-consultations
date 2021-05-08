import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger" [id]="errorIdName">{{errorMessage}}</p>`,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;
  @Input() errorIdName: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }


  private mustShowErrorMessage(): boolean {
    return this.formControl && this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    // console.log('this.formControl.errors', this.formControl.errors);
    if (this.formControl.errors.required) {
      return 'Obrigatório';
    } else if (this.formControl.errors.email) {
      return 'formato de email inválido';
    } else if (this.formControl.errors.forbiddenName) {
      const forbiddenText = this.formControl.errors.forbiddenName.value;
      return `Não é permitido ${forbiddenText} `;
    } else if (this.formControl.errors.mustMatch) {
      return `Senhas não conferem`;
    } else if (this.formControl.errors.numberNotFound) {
      return `Deve conter pelo menos 1 número!`;
    } else if (this.formControl.errors.upperNotFound) {
      return `Deve conter pelo menos 1 em maiúscula!`;
    } else if (this.formControl.errors.lowerNotFound) {
      return `Deve conter pelo menos 1 em minúscula!`;
    } else if (this.formControl.errors.specialNotFound) {
      return `Deve conter pelo menos 1 caracter especial`;
    } else if (this.formControl.errors.cpf) {
      return `CPF inválido`;
    } else if (this.formControl.errors.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `deve ter no mínimo ${requiredLength} caracteres`;
    } else if (this.formControl.errors.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `deve ter no máximo ${requiredLength} caracteres`;
    } else {
      console.log('this.formControl.errors', this.formControl.errors);
      return `campo inválido`;
    }
  }

}
