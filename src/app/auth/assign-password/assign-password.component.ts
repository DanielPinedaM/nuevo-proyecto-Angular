import { Component, inject, OnInit, signal } from '@angular/core';
import { PrimeNgModules } from '@/imports/import-prime-ng';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@/service/generalService/http.service';
import { environment } from '@/environments/environment';
import path from '@/models/constants/path.constants';
import { IPath } from '@/models/interfaces/path.interfaces';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';
import {
  contactSupport,
  enterFields,
} from '@/models/constants/error-message.constants';
import {
  IBodyAssignPassword,
  IInputValuePassword,
  IObjValidatePassword,
} from '@/models/interfaces/auth.interfaces';
import { minLengthPassword } from '@/models/constants/auth.constants';
import { constRegex } from '@/models/constants/regex.constants';
import DataTypeClass from '@/utils/class/DataTypeClass.utils';
import CryptoServiceClass from '@/utils/class/CryptoServiceClass.utils';
import GeneralClass from '@/utils/class/GeneralClass.utils';

@Component({
  selector: 'app-assign-password',
  templateUrl: './assign-password.component.html',
  imports: [...PrimeNgModules, RouterModule],
})
export class AssignPasswordComponent implements OnInit {
  httpService = inject(HttpService);
  hotToast = inject(HotToastClass);
  router = inject(Router);
  route = inject(ActivatedRoute);

  path = signal<IPath>(path);

  idParams = signal<string | null>(null);

  // necesario para validar <input> contraseña y confirmar contraseña
  objValidatePassword = signal<IObjValidatePassword | undefined>(undefined);
  inputValuePassword = signal<IInputValuePassword>({
    password: '',
    confirmPassword: '',
  });

  ngOnInit() {
    this.idParams.set(this.route.snapshot.paramMap.get('id'));
  }

  formAssignPassword = new FormGroup({
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

  async onSubmitAssignPassword(): Promise<void> {
    this.formAssignPassword.markAllAsTouched();

    if (this.formAssignPassword.invalid || this.objValidatePassword()?.error) {
      this.hotToast.infoNotification(enterFields);
      return;
    }

    if (!this.idParams) {
      this.hotToast.infoNotification(contactSupport);

      console.error(
        '❌ error, en el params NO existe el ID de recuperar clave ',
        '\nthis.idParams',
        this.idParams
      );
      return;
    }

    const { password } = this.formAssignPassword.value;

    const bodyAssignPassword: IBodyAssignPassword = {
      id: DataTypeClass.convertToNumber(this.idParams)!,
      password: await CryptoServiceClass.encrypt(password!.trim()),
    };

    const { success, message } = await this.httpService.request(
      'PUT',
      `${environment.api}user/resetPassword/${bodyAssignPassword.id}`,
      { body: bodyAssignPassword, isASecurityEndpoint: false }
    );

    if (success) {
      this.hotToast.successNotification(
        'Se ha restablecido su contraseña, inicie sesion para continuar'
      );
      this.formAssignPassword.reset();
      this.router.navigate(['/' + path.auth.login]);
    } else {
      this.hotToast.errorNotification(message);
    }
  }
}
