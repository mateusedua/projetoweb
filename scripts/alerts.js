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