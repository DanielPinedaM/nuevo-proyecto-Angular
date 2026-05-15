import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '@/shared/API/general-API/http-observable.api';
import { environment } from '@/environments/environment';
import { RouterModule } from '@angular/router';
import HotToastClass from '@/shared/utils/class/notification/HotToastClass.utils';
import { enterFields } from '@/shared/models/constants/error-message.const';
import CryptoServiceClass from '@/shared/utils/class/CryptoServiceClass.utils';
import {
  IRequestOptions,
  IResponse,
} from '@/shared/API/general-API/types/request-data.types';
import { firstValueFrom } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';

export interface IBodyRecoverPassword {
  email: string;
}

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MessageModule,
    InputTextModule,
  ],
})
export class RecoverPasswordComponent implements OnInit {
  cryptoServiceClass = inject(CryptoServiceClass);
  http = inject(HttpService);
  hotToast = inject(HotToastClass);

  ngOnInit() {}

  formRecoverPassword = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email,
    ]),
  });

  async onSubmitRecoverPassword(): Promise<void> {
    this.formRecoverPassword.markAllAsTouched();

    if (this.formRecoverPassword.invalid) {
      this.hotToast.infoNotification(enterFields);
      return;
    }

    const { email } = this.formRecoverPassword.value;

    const optionsApi: IRequestOptions<IBodyRecoverPassword> = {
      body: {
        email: (await this.cryptoServiceClass.encrypt(email!.trim())) as string,
      },
    };

    const { success, message }: IResponse = await firstValueFrom(
      this.http.POST(`${environment.api}`, optionsApi)
    );

    if (success) {
      this.hotToast.successNotification(
        'Revise el correo que se le envio para continuar cambiando su contraseña'
      );
      this.formRecoverPassword.reset();
    } else {
      this.hotToast.errorNotification(message);
    }
  }
}
