import { Component, OnInit } from '@angular/core';
import { PrimeNgModules } from '@/app/imports/import-prime-ng';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@/app/service/generalService/http.service';
import { environment } from '@/environments/environment';
import { constRegex } from '@/app/types/constants/const-regex';
import path from '@/app/types/constants/cons-path';
import { IPath } from '@/app/types/interfaces/interface-path';
import { Router, RouterModule } from '@angular/router';
import SweetAlertClass from '@/app/utils/class/notification/SweetAlertClass';
import HotToastClass from '@/app/utils/class/notification/HotToastClass';
import { enterFields } from '@/app/types/constants/const-error-message';
import {
  IBodyRegister,
  IInputValuePassword,
  IObjValidatePassword,
} from '@/app/types/interfaces/interface-auth';
import { minLengthPassword } from '@/app/types/constants/const-auth';
import GeneralClass from '@/app/utils/class/GeneralClass';
import CryptoServiceClass from '@/app/utils/class/CryptoServiceClass';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [...PrimeNgModules, RouterModule],
})
export class RegisterComponent implements OnInit {
  path: IPath = path;

  // necesario para validar <input> contraseña y confirmar contraseña
  objValidatePassword: IObjValidatePassword | undefined;
  inputValuePassword: IInputValuePassword = {
    password: '',
    confirmPassword: '',
  };

  constructor(
    private httpService: HttpService,
    private hotToast: HotToastClass,
    private router: Router,
  ) {}

  ngOnInit() {}

  formRegister = new FormGroup({
    nameUser: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(constRegex.text.any),
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email,
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(minLengthPassword),
      Validators.pattern(constRegex.text.strongPassword),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(minLengthPassword),
      Validators.pattern(constRegex.text.strongPassword),
    ]),
  });

  doNotAllowCopyPasteCut(event: ClipboardEvent): void {
    event.preventDefault();
    this.hotToast.infoNotification(
      'No puedes copiar y pegar la contraseña, escribela manualmente'
    );
  }

   onChangeValidatePassword(
    value: string = '',
    formControlName: 'password' | 'confirmPassword'
  ): void {
    if (!formControlName) {
      console.error(
        '❌ error: no existe el formControlName en onChangeValidatePassword \n',
        formControlName
      );
      return;
    }

    // guardar en un estado los input value de contraseña y confirmar contraseña
    if (formControlName === 'password') {
      this.inputValuePassword.password = value;
    }
    if (formControlName === 'confirmPassword') {
      this.inputValuePassword.confirmPassword = value;
    }

    /* validar que...
    1) Sea igual lo escrito en los <input> contraseña y confirmar contraseña
    2) la contraseña sea segura */
    this.objValidatePassword = GeneralClass.validatePasswords(
      this.inputValuePassword.password,
      this.inputValuePassword.confirmPassword
    );
  }

  async onSubmitRegister() {
    this.formRegister.markAllAsTouched();

    if (this.formRegister.invalid || this.objValidatePassword?.error) {
      this.hotToast.infoNotification(enterFields);
      return;
    }

    const result = await SweetAlertClass.MessageQuestion(
      'Confirmación',
      '¿Sus datos son correctos?',
      'warning'
    );

    if (!result.isConfirmed) return;

    const { nameUser, email, password } = this.formRegister.value;

    const bodyRegister: IBodyRegister = {
      nameUser: nameUser!.trim().toLowerCase(),
      email: email!.trim(),
      password: await CryptoServiceClass.encrypt(password!.trim()),
      activate: false,
    };

     const { success, message } = await this.httpService.request(
      'POST',
      `${environment.api}user/createUser`,
      { body: bodyRegister, isASecurityEndpoint: false }
    );

    if (success) {
      this.hotToast.successNotification(`Usuario ${nameUser} registrado, inicie sesión para continuar `);
      this.formRegister.reset();
      this.router.navigate(['/' + path.auth.login]);
    } else {
      this.hotToast.errorNotification(message);
     }
   }
}
