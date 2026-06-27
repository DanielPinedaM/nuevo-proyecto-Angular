import { environment } from '@/environments/environment';
import { IResponse } from '@/shared/http-client/data-types/interfaces/http-client.interface';
import CryptoService from '@/shared/services/Crypto.service';
import ToastService from '@/shared/services/Toast.service';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { firstValueFrom } from 'rxjs';

export interface IBodyRecoverPassword {
  email: string;
}

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
  http = inject(HttpClient);
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

    const body: IBodyRecoverPassword = {
      email: (await this.cryptoServiceClass.encrypt(email!.trim())) as string,
    };

    const { success, message } = await firstValueFrom(
      this.http.post<IResponse<unknown>>(`${environment.api}`, body)
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
