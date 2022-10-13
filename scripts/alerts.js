export function alertSuccess(data,redirect){
    Swal.fire({
        title: 'Sucesso!',
        text: data,
        icon: 'success',
        confirmButtonText: 'Ok',
        
      }).then(()=>{
        window.location.href=redirect;
      })
}

export function alertSucessVacina(data){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: data
  })
}