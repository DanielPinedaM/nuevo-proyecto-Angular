import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '@/shared/service/general-service/http-observable.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import HotToastClass from '@/shared/utils/class/notification/HotToastClass.utils';
import { environment } from '@/environments/environment';
import { firstValueFrom } from 'rxjs';
import {
  contactSupport,
  enterFields,
} from '@/shared/models/constants/error-message.const';
import {
  IBodyAssignPassword,
  IInputValuePassword,
  IObjValidatePassword,
} from '@/app/auth/models/interfaces/auth.interfaces';
import { minLengthPassword } from '@/app/auth/models/constants/auth.const';
import { constRegex } from '@/shared/models/constants/regex.const';
import CryptoServiceClass from '@/shared/utils/class/CryptoServiceClass.utils';
import {
  IRequestOptions,
  IResponse,
} from '@/shared/service/general-service/types/request-data.types';
import GeneralClass from '@/shared/utils/class/GeneralClass.utils';
import DataTypeClass from '@/shared/utils/class/DataTypeClass.utils';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-assign-password',
  templateUrl: './assign-password.component.html',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    MessageModule,
  ],
})
export class AssignPasswordComponent implements OnInit {
  cryptoServiceClass = inject(CryptoServiceClass);
  generalClass = inject(GeneralClass);
  dataTypeClass = inject(DataTypeClass);
  http = inject(HttpService);
  hotToast = inject(HotToastClass);
  router = inject(Router);
  route = inject(ActivatedRoute);

  idParams = signal<string | null>(null);

  // necesario para validar <input> contraseña y confirmar contraseña
  objValidatePassword = signal<IObjValidatePassword | undefined>(undefined);
  inputValuePassword = signal<IInputValuePassword>({
    password: '',
    confirmPassword: '',
  });

  ngOnInit() {
    this.idParams.set(this.route.snapshot.paramMap.get('id'));
  }

  formAssignPassword = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(minLengthPassword),
      Validators.pattern(constRegex.text.strongPassword),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(minLengthPassword),
      Validators.pattern(constRegex.text.strongPassword),
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

  async onSubmitAssignPassword(): Promise<void> {
    this.formAssignPassword.markAllAsTouched();

    if (this.formAssignPassword.invalid || this.objValidatePassword()?.error) {
      this.hotToast.infoNotification(enterFields);
      return;
    }

    if (!this.idParams) {
      this.hotToast.infoNotification(contactSupport);

      console.error(
        '❌ error, en el params NO existe el ID de recuperar clave ',
        '\nthis.idParams',
        this.idParams
      );
      return;
    }

    const { password } = this.formAssignPassword.value;

    const optionsApi: IRequestOptions<IBodyAssignPassword> = {
      body: {
        id: this.dataTypeClass.convertToNumber(this.idParams)!,
        password: (await this.cryptoServiceClass.encrypt(
          password!.trim()
        )) as string,
      },
    };

    const { success, message }: IResponse = await firstValueFrom(
      this.http.POST(`${environment.api}`, optionsApi)
    );

    if (success) {
      this.hotToast.successNotification(
        'Se ha restablecido su contraseña, inicie sesion para continuar'
      );
      this.formAssignPassword.reset();
      this.router.navigate(['/autenticacion/iniciar-sesion']);
    } else {
      this.hotToast.errorNotification(message);
    }
  }
}
