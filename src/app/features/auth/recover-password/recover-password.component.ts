import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '@/environments/environment';
import { RouterModule } from '@angular/router';
import ToastService from '@/shared/services/Toast.service';
import CryptoService from '@/shared/services/Crypto.service';
import { firstValueFrom } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { GatewayApiService } from '@/shared/services/api/http-client/http-gateway-observable.api';
import { IRequestOptions } from '@/shared/services/api/http-client/data-types/interfaces/gateway.interface';

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
  cryptoServiceClass = inject(CryptoService);
  http = inject(GatewayApiService);
  toast = inject(ToastService);

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

    if (this.formRecoverPassword.invalid) return;

    const { email } = this.formRecoverPassword.value;

    const optionsApi: IRequestOptions<IBodyRecoverPassword> = {
      body: {
        email: (await this.cryptoServiceClass.encrypt(email!.trim())) as string,
      },
    };

    const { success, message } = await firstValueFrom(
      this.http.POST(`${environment.api}`, optionsApi)
    );

    if (success) {
      this.toast.success(
        'Revise el correo que se le envio para continuar cambiando su contraseña'
      );
      this.formRecoverPassword.reset();
    } else {
      this.toast.error(message);
    }
  }
}
