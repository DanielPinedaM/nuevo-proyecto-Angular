import { inject, Injectable } from '@angular/core';
import { enc, mode, pad, AES } from 'crypto-js';
import DataTypeService from '@/shared/services/DataType.service';
import {
  IV_AUTH,
  SECRET_KEY_AUTHENTICATION,
} from '@/app/features/auth/data-types/constants/auth.const';

@Injectable({
  providedIn: 'root',
})
export default class CryptoService {
  private dataTypeClass = inject(DataTypeService);

  async encrypt(text: string): Promise<string | null> {
    if (!this.dataTypeClass.isString(text)) {
      console.error('❌ para encriptar se requiere q text sea tipo string');
      return null;
    }

    const key = enc.Utf8.parse(SECRET_KEY_AUTHENTICATION); // número hexadecimal de 16 dígitos como clave
    const iv = enc.Utf8.parse(IV_AUTH); // Número hexadecimal como desplazamiento de clave

    const textoHexa = enc.Utf8.parse(text);
    const encrypted = AES.encrypt(textoHexa, key, {
      keySize: 128,
      iv: iv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    // Aquí devolvemos todo el objeto cifrado en formato Base64
    return encrypted.toString();
  }

  async decrypt(encryptedText: string): Promise<string | null> {
    if (!this.dataTypeClass.isString(encryptedText)) {
      console.error('❌ para encriptar se requiere q text sea tipo string');
      return null;
    }

    const key = enc.Utf8.parse(SECRET_KEY_AUTHENTICATION);
    const iv = enc.Utf8.parse(IV_AUTH);

    // AES.decrypt ahora acepta el texto cifrado completo
    const decrypted = AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    return decrypted.toString(enc.Utf8);
  }

  async encryptJSON(data: Record<string, any>): Promise<string | null> {
    const text: string = JSON.stringify(data);
    return await this.encrypt(text);
  }

  async decryptJSON(encryptedJSON: string): Promise<any | null> {
    const decryptedJSON: string | null = await this.decrypt(encryptedJSON);

    if (this.dataTypeClass.isValidJSONparse(decryptedJSON as string))
      return JSON.parse(decryptedJSON as string);

    console.error('❌ [decryptJSON] error no es JSON valido ', decryptedJSON);
    return null;
  }
}
