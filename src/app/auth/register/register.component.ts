import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '@/environments/environment';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import SweetAlertClass from '@/shared/utils/class/notification/SweetAlertClass.utils';
import HotToastClass from '@/shared/utils/class/notification/HotToastClass.utils';
import {
  IBodyRegister,
  IInputValuePassword,
  IObjValidatePassword,
} from '@/app/auth/models/interfaces/auth.interfaces';
import { minLengthPassword } from '@/app/auth/models/constants/auth.const';
import GeneralClass from '@/shared/utils/class/GeneralClass.utils';
import CryptoServiceClass from '@/shared/utils/class/CryptoServiceClass.utils';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ApiGatewayService } from '@/shared/services/api/general-api/http-gateway-observable.api';
import { IRequestOptions, IResponse } from '@/shared/services/api/general-api/types/request-data.types';
import { CONST_REGEX } from '@/shared/data-types/constants/regex.const';
import { enterFields } from '@/shared/data-types/constants/error-message.const';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MessageModule,
    PasswordModule,
    InputTextModule,
  ],
})
export class RegisterComponent implements OnInit {
  cryptoServiceClass = inject(CryptoServiceClass);
  sweetAlertClass = inject(SweetAlertClass);
  generalClass = inject(GeneralClass);
  http = inject(ApiGatewayService);
  hotToast = inject(HotToastClass);
  router = inject(Router);

  // necesario para validar <input> contraseña y confirmar contraseña
  objValidatePassword = signal<IObjValidatePassword | undefined>(undefined);
  inputValuePassword = signal<IInputValuePassword>({
    password: '',
    confirmPassword: '',
  });

  ngOnInit() {}

  formRegister = new FormGroup({
    nameUser: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(CONST_REGEX.text.any),
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email,
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(minLengthPassword),
      Validators.pattern(CONST_REGEX.text.strongPassword),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(minLengthPassword),
      Validators.pattern(CONST_REGEX.text.strongPassword),
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
      this.generalClass.validatePasswords(password, confirmPassword)
    );
  }

  async encryptRegister(
    decryptedNameUser: string,
    decryptedEmail: string,
    decryptedPassword: string
  ): Promise<{
    encryptedNameUser: string;
    encryptedEmail: string;
    encryptedPassword: string;
  }> {
    const [encryptedNameUser, encryptedEmail, encryptedPassword] =
      await Promise.all([
        this.cryptoServiceClass.encrypt(decryptedNameUser) as Promise<string>,
        this.cryptoServiceClass.encrypt(decryptedEmail) as Promise<string>,
        this.cryptoServiceClass.encrypt(decryptedPassword) as Promise<string>,
      ]);

    return { encryptedNameUser, encryptedEmail, encryptedPassword };
  }

  async onSubmitRegister(): Promise<void> {
    this.formRegister.markAllAsTouched();

    if (this.formRegister.invalid || this.objValidatePassword()?.error) {
      this.hotToast.infoNotification(enterFields);
      return;
    }

    const result = await this.sweetAlertClass.messageQuestion(
      'Confirmación',
      '¿Sus datos son correctos?',
      'warning'
    );

    if (!result.isConfirmed) return;

    const { nameUser, email, password } = this.formRegister.value;

    const { encryptedNameUser, encryptedEmail, encryptedPassword } =
      await this.encryptRegister(
        nameUser!.trim(),
        email!.trim(),
        password!.trim()
      );

    const optionsApi: IRequestOptions<IBodyRegister> = {
      body: {
        nameUser: encryptedNameUser as string,
        email: encryptedEmail as string,
        password: encryptedPassword as string,
      },
    };

    const { success, data, message }: IResponse = await firstValueFrom(
      this.http.POST(`${environment.api}`, optionsApi)
    );

    if (success) {
      this.hotToast.successNotification(
        `Usuario ${nameUser} registrado, inicie sesión para continuar `
      );
      this.formRegister.reset();
      this.router.navigate(['/iniciar-sesion']);
    } else {
      this.hotToast.errorNotification(message);
    }
  }
}
