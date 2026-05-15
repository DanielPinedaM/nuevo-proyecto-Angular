import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Storage from '@/shared/utils/class/SessionStorageClass.utils';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '@/environments/environment';
import DataTypeClass from '@/shared/utils/class/DataTypeClass.utils';
import { HttpService } from '@/shared/API/general-API/http-observable.api';
import HotToastClass from '@/shared/utils/class/notification/HotToastClass.utils';
import { enterFields } from '@/shared/models/constants/error-message.const';
import { minLengthPassword } from '@/app/auth/models/constants/auth.const';
import CryptoServiceClass from '@/shared/utils/class/CryptoServiceClass.utils';
import {
  IRequestOptions,
  IResponse,
} from '@/shared/API/general-API/types/request-data.types';
import { firstValueFrom } from 'rxjs';
import { IBodyLogin } from '@/app/auth/models/interfaces/auth.interfaces';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MessageModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
  ],
})
export class LoginComponent implements OnInit {
  storage = inject(Storage);
  cryptoServiceClass = inject(CryptoServiceClass);
  dataTypeClass = inject(DataTypeClass);
  http = inject(HttpService);
  hotToast = inject(HotToastClass);
  router = inject(Router);

  dataLoginBurned: boolean = ['localhost'].includes(environment.NODE_ENV);

  minLengthPassword = signal<number>(minLengthPassword);

  formLogin = new FormGroup({
    email: new FormControl(
      this.dataLoginBurned ? environment.auth.user : '',
      this.dataLoginBurned
        ? []
        : [Validators.required, Validators.minLength(3), Validators.email]
    ),
    password: new FormControl(
      this.dataLoginBurned ? environment.auth.password : '',
      this.dataLoginBurned
        ? []
        : [Validators.required, Validators.minLength(this.minLengthPassword())]
    ),
    rememberMe: new FormControl(false),
  });

  ngOnInit() {
    this.storage.deleteAll();
  }

  setSessionStorage(data: { [key: string]: any }): void {
    if (!data) {
      console.error(
        '❌ error, NO se puede setear Session Storage porque la api ha respondido con un valor falsy\n',
        data
      );
      return;
    }

    if (!this.dataTypeClass.isLiteralObject(data)) {
      console.error(
        '❌ error, NO se puede setear Session Storage porque la api NO ha respondido con un objeto literal\n',
        data
      );
      return;
    }

    if (this.dataTypeClass.literalObjectLength(data) <= 0) {
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

      this.storage.saveAndUpdate(key, value);
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

  async encryptCredentials(
    decryptedEmail: string,
    decryptedPassword: string
  ): Promise<{ encryptedEmail: string; encryptedPassword: string }> {
    const [encryptedEmail, encryptedPassword] = await Promise.all([
      this.cryptoServiceClass.encrypt(decryptedEmail) as Promise<string>,
      this.cryptoServiceClass.encrypt(decryptedPassword) as Promise<string>,
    ]);

    return { encryptedEmail, encryptedPassword };
  }

  async onSubmitLogin(): Promise<void> {
    if (this.formLogin.invalid && !this.dataLoginBurned) {
      this.hotToast.infoNotification(enterFields);
      return;
    }

    const { email, password } = this.formLogin.value;

    const { encryptedEmail, encryptedPassword } = await this.encryptCredentials(
      email!.trim(),
      password!.trim()
    );

    const optionsApi: IRequestOptions<IBodyLogin> = {
      body: {
        email: encryptedEmail,
        password: encryptedPassword,
      },
    };

    const { success, data, message }: IResponse = await firstValueFrom(
      this.http.POST(`${environment.api}`, optionsApi)
    );

    /* EL SIGUIENTE CODIGO DEBERIA ESTAR DESCOMENTADO CUANDO FUNCIONE LA CONEXION A LA API  */
    //if (success) {
    this.setSessionStorage(data);
    this.router.navigate(['/inicio/bots']);
    //} else {
    //  this.hotToast.errorNotification(message);
    //}
  }
}
