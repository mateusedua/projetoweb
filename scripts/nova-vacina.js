const readURL = (input) =>{
    if(input.files && input.files[0]){
        const reader = new FileReader();

        reader.onload = (e) =>{
            $('#file_upload').attr('src',e.target.result)
        }

        reader.readAsDataURL(input.files[0])
    }
}