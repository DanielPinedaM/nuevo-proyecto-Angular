import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  sessionStorageDeleteAll,
  sessionStorageSaveAndUpdate,
} from '@/app/utils/func/sessionStorage';
import path from '@/app//models/constants/path.constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNgModules } from '@/app/imports/import-prime-ng';
import { environment } from '@/environments/environment';
import { IPath } from '@/app/models/interfaces/path.interfaces';
import DataTypeClass from '@/app/utils/class/DataTypeClass';
import { HttpService } from '@/app/service/generalService/http.service';
import HotToastClass from '@/app/utils/class/notification/HotToastClass';
import { enterFields } from '@/app/models/constants/error-message.constants';
import { IBodyLogin } from '@/app/models/interfaces/auth.interfaces';
import { initRoute, minLengthPassword } from '@/app/models/constants/auth.constants';
import CryptoServiceClass from '@/app/utils/class/CryptoServiceClass';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [...PrimeNgModules, RouterModule],
})
export class LoginComponent implements OnInit {
  path: IPath = path;

  showPassword: boolean = true;

  minLengthPassword: number = minLengthPassword;

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email,
    ]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  constructor(
    private router: Router,
    private httpService: HttpService,
    private hotToast: HotToastClass
  ) {}

  ngOnInit() {
    sessionStorageDeleteAll();
  }

  setSessionStorage(data: { [key: string]: any }): void {
    if (!data) {
      console.error(
        '❌ error, NO se puede setear Session Storage porque la api ha respondido con un valor falsy\n',
        data
      );
      return;
    }

    if (!DataTypeClass.isLiteralObject(data)) {
      console.error(
        '❌ error, NO se puede setear Session Storage porque la api NO ha respondido con un objeto literal\n',
        data
      );
      return;
    }

    if (DataTypeClass.literalObjectLength(data) <= 0) {
      console.error(
        '❌ error, NO se puede setear Session Storage porque la api ha respondido con un objeto literal vacio\n',
        data
      );
      return;
    }

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;

      if (!key || !value) {
        console.error(
          '❌ error, en la data q responde el back al loguearse alguna key o value es falsy \n',
          'key ',
          key,
          'value ',
          value
        );
        return;
      }

      sessionStorageSaveAndUpdate(key, value);
    });
  }

  doNotAllowCopyPasteCut(event: ClipboardEvent): void {
    if (environment.production) {
      event.preventDefault();
      this.hotToast.infoNotification(
        'No puedes copiar y pegar la contraseña, escribela manualmente'
      );
    }
  }

  async onSubmitLogin() {
    if (this.formLogin.invalid) {
      this.hotToast.infoNotification(enterFields);
      return;
    }

    const { email, password } = this.formLogin.value;

    const bodyLogin: IBodyLogin = {
      email: email!.trim(),
      password: await CryptoServiceClass.encrypt(password!.trim()),
    };

    const { success, message, data } = await this.httpService.request(
      'POST',
      environment.auth.login,
      { body: bodyLogin }
    );

    this.router.navigate(['/' + path.home.home + '/' + path.home.bots])

    /* if (success) {
      this.setSessionStorage(data);
      this.router.navigate([initRoute]);
    } else {
      this.hotToast.errorNotification(message);
    } */
  }
}
