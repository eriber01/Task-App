import {useState, useEffect} from 'react'
import { FirebaseStorage } from '../../Services/FirebaseConfig'
import './Task.css'

//importando los servicios para las Tareas y la validacion
import GetTask from '../../Services/GetTask'
import DeleteTask from '../../Services/DeleteTask'
import UpdateTask from '../../Services/UpdateTask'
import SetUpdateTask from '../../Services/SetUpdateTask'
import FormDataValidation from '../../Services/FormDataValidation'
import SendFirebaseTask from '../../Services/SendFirebaseTask'


export default function Task() {
    //estados de las tareas
    const [ListTask, setListTask] = useState([])

    const [addTask, setaddTask] = useState([{
        taskName: '',
        taskDescription: ''
    }])

    //estados de los diferentes mensajes
    const [MessageError, setMessageError] = useState(null)
    const [MessageSuccess, setMessageSuccess] = useState(null)

    const [ModoEdicion, setModoEdicion] = useState(null)

    //cargar las tareas cuando se ejecuta la pagina
    useEffect(()=>{
        GetTask()
            .then(TaskData =>{
                setListTask(TaskData)
            })
    },[])

    //maneja el tiempo que duran los mensajes
    const TimeMessage = ()=>{
        setTimeout(() => {
            setMessageSuccess(null)
            setMessageError(null)
        }, 2500);
    }

    //llama a la funcion que valida los datos de form
    // y envias los datos de los imput para guardarlos en firebase
    const SendTask = async (eve)=>{
        eve.preventDefault()

        //objeto con los datos para la validacion
        const ValData = {
            imput1: addTask.taskName,
            imput2: addTask.taskDescription
        }
        //funcion que valida los datos
        await FormDataValidation(ValData, 'task')
            .then((ResValidation) =>{
                //valida si la respuesta de la validacion es correcta
                if (ResValidation.statusValidation === false) {
                    setMessageError(ResValidation.mesValidation)

                    //valida cual de los imput debe limpiarse
                    if (ResValidation.campo === 1) {
                        setaddTask({...addTask, taskName: ''})
                        
                    }else if (ResValidation.campo === 2) {
                        setaddTask({...addTask, taskDescription: ''})
                    }

                    setMessageSuccess(null)
                    TimeMessage()
                }else{
                    //funcion que guarda los datos 
                    SendFirebaseTask(addTask)

                    setaddTask({...addTask, taskName: '', taskDescription: ''})
                    setMessageError(null)

                    setMessageSuccess('La tarea se Agrego con Exito')

                    TimeMessage()
                    //carga todos datos de firebase y los agrega al
                    GetTask()
                        .then(TaskData =>{
                            setListTask(TaskData)
                        })
                }
            })
    }


    const Delete = async (item)=>{
        
        await DeleteTask(item)

        GetTask()
            .then(TaskData =>{
                setListTask(TaskData)
            })
        
        setMessageSuccess('Se a Borrado la Tarea con existo')

        setaddTask({...addTask, taskName: '', taskDescription: ''})
        setModoEdicion(null)
        TimeMessage()
    }

    const Update = async(item)=>{
        await UpdateTask(item)
                .then(TaskData =>{
                    setaddTask({...addTask, taskName: TaskData.Name, 
                        taskDescription: TaskData.Descripcion})
                })

        setModoEdicion('Activo')
    }

    const SetUpdate = async (eve)=>{
        eve.preventDefault()
        const id = ListTask[0].id
        
        await FormDataValidation(addTask)
        .then((ResValidation) =>{
            //valida si la respuesta de la validacion es correcta
            if (ResValidation.statusValidation === false) {
                setMessageError(ResValidation.mesValidation)
                //valida cual de los imput debe limpiarse
                if (ResValidation.campo === 1) {
                    setaddTask({...addTask, taskName: ''})
                }else if (ResValidation.campo === 2) {
                    setaddTask({...addTask, taskDescription: ''})
                }

                setMessageSuccess(null)
                TimeMessage()
            }else   {
                SetUpdateTask(addTask, id)
                    .then(
                        GetTask()
                            .then(TaskData =>{
                        setListTask(TaskData)
                    }),
                    
                    setaddTask({...addTask, taskName: '', taskDescription: ''}),
                    setModoEdicion(null),
                    setMessageSuccess('Se a Actualizado la Tarea'),
                    TimeMessage()

                )
            }
        })
    }

    return (
        <div className='container-task'>
            <div className='form-task-data'>
                <h3>Agrega la Tarea Aqui</h3>

                <form onSubmit={ModoEdicion ? SetUpdate : SendTask} className='form-add-task'>
                    <input required={true} onChange={(eve)=>
                        setaddTask({...addTask, taskName: eve.target.value})} 
                        type='text' 
                        placeholder='Nombre de la tarea'
                        value={addTask.taskName}
                    />

                    <textarea required={true} onChange={(eve)=>
                        setaddTask({...addTask, taskDescription: eve.target.value})
                        }
                        placeholder='Descripcion de la tarea'
                        value={addTask.taskDescription}
                    />
                    {
                        ModoEdicion ?
                        (
                            <button>Actualizar</button>
                        )
                        :
                        (
                            <button>Agregar</button>
                        )
                    }
                </form>
                
                {
                    MessageError ?
                    (
                        <div className='error-container'>
                            <p>
                                {MessageError}
                            </p>
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }

                {
                    MessageSuccess ? 
                    (
                        <div className='success-container'>
                            <p>
                                {MessageSuccess}
                            </p>
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }

            </div>
            
            
            <div className='task-edit'>
                <h3>Tareas Agregadas</h3>
                
                {
                    ListTask.map((item)=>(
                        <div key={item.id} className='task'>
                            <span>{item.TaskName}</span>
                            <p>{item.TaskDescription}</p>
    
                            <div>
                                <button onClick={()=> Update(item.id)}
                                    className='btn-editar'>Editar
                                </button>
                                
                                <button onClick={()=> Delete(item.id)}
                                    className='btn-borrar'>Borrar
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
