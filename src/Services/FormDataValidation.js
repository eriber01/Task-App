
const FormDataValidation = async (FormData, action)=>{
    
    let ResValidation = {
        mesValidation: '',
        statusValidation: ''
    }

    const Data = await {
        input1: FormData.input1,
        input2: FormData.input2
    }

    if (action === 'Task') {
        if (!Data.input1.trim()) {
            ResValidation = {
                mesValidation: 'Debe introducir un nombre para la tarea',
                statusValidation: false,
                campo: 1
            }
            return ResValidation
    
        }else if(!Data.input2.trim()){
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
    }else if(action === 'Login'){

        if (!Data.input1.trim()) {
            ResValidation = {
                mesValidation: 'Debe introducir un Email',
                statusValidation: false,
                campo: 1
            }
            return ResValidation
    
        }else if(!Data.input2.trim()){
            ResValidation = {
                mesValidation: 'Debe introducir un Pass',
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
}

export default FormDataValidation