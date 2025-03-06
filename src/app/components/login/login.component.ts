import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  sessionStorageDeleteAll,
  sessionStorageSaveAndUpdate,
} from '@/app/utils/func/sessionStorage';
import path from '@/app/types/constants/cons-path';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PrimeNgModules } from '@/app/imports/import-prime-ng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [...PrimeNgModules]
})
export class LoginComponent implements OnInit {
  showPassword: boolean = true;

  formLogin = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(private router: Router) {}

  ngOnInit() {
    sessionStorageDeleteAll();
  }

  onSubmitLogin(): void {
    if (this.formLogin.invalid) return;

    const { user, password } = this.formLogin.value;

    const body: any = {
      uno: user,
      dos: password,
    };

    console.log('enviando peticion a ', environment.user.login);

    const resp = {
      data: {
        token: 'hola mundo',
        username: 'Yeison Alvarez Balvin',
      },
    };
    this.setSessionStorage(resp);

    this.router.navigate(['/' + path.home.home + '/' + path.home.bots]);
  }

  setSessionStorage(resp: any): void {
    const user = resp?.data;

    if (user && Object?.keys(user)?.length) {
      Object.entries(user).map((entry: any) => {
        const [property, value] = entry;
        if (property) {
          sessionStorageSaveAndUpdate(property, value);
        }
      });
    } else {
      console.error(
        '❌ error',
        '\n',
        'no se puede setear el sessionStorage porque en la respuesta de la API no existe la propiedad resp?.data',
        '\n',
        resp
      );
    }
  }
}
