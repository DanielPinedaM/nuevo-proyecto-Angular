import { Component, inject, OnInit, signal } from '@angular/core';
import { PrimeNgModules } from '@/imports/import-prime-ng';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@/service/general-service/http.service';
import { environment } from '@/environments/environment';
import path from '@/models/constants/path.constants';
import { IPath } from '@/models/interfaces/path.interfaces';
import { RouterModule } from '@angular/router';
import HotToastClass from '@/utils/class/notification/HotToastClass.utils';
import { enterFields } from '@/models/constants/error-message.constants';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  imports: [...PrimeNgModules, RouterModule],
})
export class RecoverPasswordComponent implements OnInit {
  httpService = inject(HttpService);
  hotToast = inject(HotToastClass);

  path = signal<IPath>(path);

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

    const { success, message } = await this.httpService.POST(
      `${environment.api}sendemail/sendEmailResetPassword`,
      { body: this.formRecoverPassword.value, isASecurityEndpoint: false }
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
