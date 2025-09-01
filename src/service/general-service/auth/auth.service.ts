import { inject, Injectable } from '@angular/core';
import { HttpService } from '@/service/general-service/http.service';
import { environment } from '@/environments/environment';
import {
  IRequestOptions,
  IResponse,
} from '@/service/general-service/types/request-data.types';
import {
  IBodyAssignPassword,
  IBodyLogin,
  IBodyRegister,
} from '@/models/interfaces/auth.interfaces';
import { Observable } from 'rxjs';
import { IBodyRecoverPassword } from '@/app/auth/recover-password/recover-password.component';
import IMenuOptions from '@/models/interfaces/menu.interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  httpService = inject(HttpService);

  login(options: IRequestOptions<IBodyLogin>): Observable<IResponse> {
    return this.httpService.POST(`${environment.auth.login}`, options);
  }

  recoverPassword(
    options: IRequestOptions<IBodyRecoverPassword>
  ): Observable<IResponse> {
    return this.httpService.PUT(
      `${environment.api}sendemail/sendEmailResetPassword`,
      options
    );
  }

  assignPassword(
    options: IRequestOptions<IBodyAssignPassword>
  ): Observable<IResponse> {
    return this.httpService.PUT(
      `${environment.api}user/resetPassword`,
      options
    );
  }

  register(options: IRequestOptions<IBodyRegister>): Observable<IResponse> {
    return this.httpService.POST(`${environment.api}user/createUser`, options);
  }

  listMenu(): Observable<IResponse<IMenuOptions[]>> {
    return this.httpService.GET(
      `${environment.api}AQUI_FALTA_ESCRIBIR_URL_DEL_ENDPOINT_DEL_MENU`
    );
  }
}
