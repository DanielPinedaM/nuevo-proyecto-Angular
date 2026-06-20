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
import ToastUtilsService from '@/shared/utils/class/Toast.utils';
import { minLengthPassword } from '@/app/features/auth/data-types/constants/auth.const';
import CryptoServiceClass from '@/shared/utils/class/CryptoServiceClass.utils';
import { firstValueFrom } from 'rxjs';
import { IBodyLogin } from '@/app/features/auth/data-types/interfaces/auth.interfaces';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ApiGatewayService } from '@/shared/services/api/http-client/http-gateway-observable.api';
import { IRequestOptions } from '@/shared/services/api/http-client/types/request-data.types';
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
  http = inject(ApiGatewayService);
  toast = inject(ToastUtilsService);
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
      this.toast.info(
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
    if (this.formLogin.invalid && !this.dataLoginBurned) return;

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

    const { success, data, message } = await firstValueFrom(
      this.http.POST(`${environment.api}`, optionsApi)
    );

    /* EL SIGUIENTE CODIGO DEBERIA ESTAR DESCOMENTADO CUANDO FUNCIONE LA CONEXION A LA API  */
    //if (success) {
    this.setSessionStorage(data);
    this.router.navigate(['/bots']);
    //} else {
    //  this.hotToast.errorNotification(message);
    //}
  }
}
