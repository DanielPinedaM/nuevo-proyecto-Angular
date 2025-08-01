import Swal from 'sweetalert2';

type TIconType = 'success' | 'info' | 'warning' | 'error';

export default class SweetAlertClass {
  public static MessageAlert(
    title: string,
    message: string,
    iconType: TIconType,
    onClose: any = null
  ) {
    if (iconType === 'success') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title,
        text: message,
        showConfirmButton: false,
        showCloseButton: true,
        //timer: 4000
      });
    } else if (iconType === 'info') {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title,
        text: message,
        showConfirmButton: false,
        showCloseButton: true,
        //timer: 4000
      });
    } else if (iconType === 'warning') {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title,
        text: message,
        showConfirmButton: false,
        showCloseButton: true,
        //timer: 6000
      });
    } else if (iconType === 'error') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title,
        text: message,
        showConfirmButton: false,
        iconColor: '#AC0000',
        showCloseButton: true,
        didClose: onClose,
        //timer: 6000
      });
    }
  }

  public static MessageQuestion(
    title: string,
    message: string,
    iconType: TIconType,
    showCancelButton: boolean = true,
    confirmButtonText: string = 'Sí',
    cancelButtonText: string = 'No'
  ) {
    return Swal.fire({
      title,
      text: message,
      icon: iconType,
      showCancelButton,
      confirmButtonText,
      cancelButtonText,
      showCloseButton: true,
    });
  }
}
