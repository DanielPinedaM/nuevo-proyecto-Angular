import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  sessionStorageDeleteAll,
  sessionStorageSaveAndUpdate,
} from '@/app/utils/func/sessionStorage';
import path from '@/app/types/constants/cons-path';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNgModules } from '@/app/imports/import-prime-ng';
import { environment } from '@/environments/environment';
import { IPath } from '@/app/types/interfaces/interface-path';
import DataTypeClass from '@/app/utils/class/DataTypeClass';
import { HttpService } from '@/app/service/generalService/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [...PrimeNgModules, RouterModule],
})
export class LoginComponent implements OnInit {
  path: IPath = path;

  showPassword: boolean = true;

  formLogin = new FormGroup({
    user: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    rememberMe: new FormControl(false)
  });

  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit() {
    sessionStorageDeleteAll();
  }

  setSessionStorage(data: { [key: string]: any }): void {
    if (!data || DataTypeClass.literalObjectLength(data) <= 0) {
      console.error(
        '❌ error, NO se puede setear el Session Storage porque la api NO ha respondido con los datos para guardar',
        '\n',
        data
      );

      return;
    }

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;

      if (!key || !value) {
        console.error(
          '❌ error, en la data q responde el back al loguearse alguna key o value es falsy ',
          key,
          value
        );
        return;
      }

      if (key) {
        sessionStorageSaveAndUpdate(key, value);
      }
    });
  }

  async onSubmitLogin() {
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) return;

    /* const { success, message, data } = await this.httpService.request(
      'POST',
      environment.auth.login,
      { body: this.formLogin.value }
    );

    if (success) {
      this.setSessionStorage(data);
      this.router.navigate(data.initRoute);
    } else {
      console.error(message);
    } */

    const data = {
      token: 'hola mundo',
      username: 'Yeison Alvarez Balvin',
    };

    this.setSessionStorage(data);
    this.router.navigate(['/' + path.home.home + '/' + path.home.bots]);
  }
}
