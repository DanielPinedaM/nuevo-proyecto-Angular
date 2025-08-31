import { Component, inject, OnInit, signal } from '@angular/core';
import { PrimeNgModules } from '@/imports/import-prime-ng';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@/service/general-service/http.service';
import { environment } from '@/environments/environment';
import { constRegex } from '@/models/constants/regex.constants';
import path from '@/models/constants/path.constants';
import { IPath } from '@/models/interfaces/path.interfaces';
import { Router, RouterModule } from '@angular/router';
import SweetAlertClass from '@/utils/class/notification/SweetAlertClass.utils';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';
import { enterFields } from '@/models/constants/error-message.constants';
import {
  IBodyRegister,
  IInputValuePassword,
  IObjValidatePassword,
} from '@/models/interfaces/auth.interfaces';
import { minLengthPassword } from '@/models/constants/auth.constants';
import GeneralClass from '@/utils/class/GeneralClass.utils';
import CryptoServiceClass from '@/utils/class/CryptoServiceClass.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [...PrimeNgModules, RouterModule],
})
export class RegisterComponent implements OnInit {
  httpService = inject(HttpService);
  hotToast = inject(HotToastClass);
  router = inject(Router);

  path = signal<IPath>(path);

  // necesario para validar <input> contraseña y confirmar contraseña
  objValidatePassword = signal<IObjValidatePassword | undefined>(undefined);
  inputValuePassword = signal<IInputValuePassword>({
    password: '',
    confirmPassword: '',
  });

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
    this.inputValuePassword.update((prev: IInputValuePassword) => ({
      ...prev,
      [formControlName]: value,
    }));

    /* validar que...
    1) Sea igual lo escrito en los <input> contraseña y confirmar contraseña
    2) la contraseña sea segura */
    const { password, confirmPassword } = this.inputValuePassword();

    this.objValidatePassword.set(
      GeneralClass.validatePasswords(password, confirmPassword)
    );
  }

  async onSubmitRegister(): Promise<void> {
    this.formRegister.markAllAsTouched();

    if (this.formRegister.invalid || this.objValidatePassword()?.error) {
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
      this.hotToast.successNotification(
        `Usuario ${nameUser} registrado, inicie sesión para continuar `
      );
      this.formRegister.reset();
      this.router.navigate(['/' + path.auth.login]);
    } else {
      this.hotToast.errorNotification(message);
    }
  }
}
