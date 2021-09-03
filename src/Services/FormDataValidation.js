
const FormDataValidation = async (FormData, action)=>{
    
    let ResValidation = {
        mesValidation: '',
        statusValidation: '',
        campo: ''
    }

    const Data = await {
        name: FormData.imput1,
        desk: FormData.imput2
    }

    
    if (!Data.name.trim()) {
        ResValidation = {
            mesValidation: 'Debe introducir un nombre para la tarea',
            statusValidation: false,
            campo: 1
        }
        return ResValidation

    }else if(!Data.desk.trim()){
        ResValidation = {
            mesValidation: 'Debe introducir una descripcion para la tarea',
            statusValidation: false,
            campo: 2
        }

        return ResValidation
    }else{
        ResValidation = {
            mesValidation: 'La tarea se Agrego con Exito',
            statusValidation: true
        }
        return ResValidation
    }
}

export default FormDataValidation