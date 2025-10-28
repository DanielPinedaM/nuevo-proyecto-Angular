import { IVAuth, secretKeyAuthentication } from '@/models/constants/auth.const';
import { inject, Injectable } from '@angular/core';
import { enc, mode, pad, AES } from 'crypto-js';
import DataTypeClass from '@/utils/class/DataTypeClass.utils';

@Injectable({
  providedIn: 'root',
})
export default class CryptoServiceClass {
  private dataTypeClass = inject(DataTypeClass);

  async encrypt(text: string): Promise<string | null> {
    if (!this.dataTypeClass.isString(text)) {
      console.error('❌ para encriptar se requiere q text sea tipo string');
      return null;
    }

    const key = enc.Utf8.parse(secretKeyAuthentication); // número hexadecimal de 16 dígitos como clave
    const iv = enc.Utf8.parse(IVAuth); // Número hexadecimal como desplazamiento de clave

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

    const key = enc.Utf8.parse(secretKeyAuthentication);
    const iv = enc.Utf8.parse(IVAuth);

    // AES.decrypt ahora acepta el texto cifrado completo
    const decrypted = AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    return decrypted.toString(enc.Utf8);
  }

  async encryptJSON(data: any): Promise<string | null> {
    const text: string = JSON.stringify(data);
    return await this.encrypt(text);
  }

  async decryptJSON(encryptedText: string): Promise<any | null> {
    const decryptedText: string | null = await this.decrypt(encryptedText);

    if (this.dataTypeClass.isValidJSONparse(decryptedText as string))
      return JSON.parse(decryptedText as string);

    console.error('❌ [decryptJSON] No es JSON válido ', decryptedText);
    return null;
  }
}
