import IObjSessionStorage from "@/app/types/interfaces/interface-session-storage";

// nombres de las propiedades q se guardar en SessionStorage
export const objSessionStorage: IObjSessionStorage = {
  token: 'token',
  username: 'username',
};

// propiedades (inmutables) q no se pueden modificar en SessionStorage
export const constImmutableProperties: string[] = [
  objSessionStorage.token!, btoa(objSessionStorage.token!),
]
