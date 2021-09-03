
const FormDataValidation = async (FormData, action)=>{
    
    let ResValidation = {
        mesValidation: '',
        statusValidation: ''
    }

    const Data = await {
        imput1: FormData.imput1,
        imput2: FormData.imput2
    }

    if (action === 'Task') {
        if (!Data.imput1.trim()) {
            ResValidation = {
                mesValidation: 'Debe introducir un nombre para la tarea',
                statusValidation: false,
                campo: 1
            }
            return ResValidation
    
        }else if(!Data.imput2.trim()){
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
        return console.log('login');
    }
}

export default FormDataValidation