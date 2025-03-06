export default class GeneralClass {
  public static normalizeStr = (string: string | any): string | any => {
    if (typeof string === 'string' || string instanceof String) {
      return string
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    }

    // Ejemplo: '  Compañía ' devuelve 'compania', true devuelve true
    return string;
  };
}
