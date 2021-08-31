import {useState, useEffect} from 'react'
import { FirebaseStorage } from '../../Services/FirebaseConfig'
import './Task.css'

import GetTask from '../../Services/GetTask'
import DeleteTask from '../../Services/DeleteTask'
import UpdateTask from '../../Services/UpdateTask'
import SetUpdateTask from '../../Services/SetUpdateTask'

export default function Task() {
    //states
    const [ListTask, setListTask] = useState([])

    const [addTask, setaddTask] = useState([{
        taskName: '',
        taskDescription: ''
    }])

    const [MessageError, setMessageError] = useState(null)
    const [MessageSuccess, setMessageSuccess] = useState(null)

    const [ModoEdicion, setModoEdicion] = useState(null)

    useEffect(()=>{
        GetTask()
            .then(TaskData =>{
                setListTask(TaskData)
            })
    },[])

    const TimeMessage = ()=>{
        setTimeout(() => {
            setMessageSuccess(null)
            setMessageError(null)
        }, 2500);
    }

    const SendTask = async (eve)=>{
        eve.preventDefault()
        
        if(!addTask.taskName.trim()){
            setMessageError('Debe introducir un nombre para la tarea')
            setMessageSuccess(null)
            setaddTask({...addTask, taskName: ''})

            TimeMessage()

        }else if(!addTask.taskDescription.trim()){
            setMessageError('Debe introducir una descripcion de la tarea')
            setaddTask({...addTask, taskDescription:''})
            setMessageSuccess(null)

            TimeMessage()

        }   else{
            const newTask = {
                TaskName: addTask.taskName,
                TaskDescription: addTask.taskDescription
            }

            await FirebaseStorage.collection('Task').add(newTask)
            
            setaddTask({...addTask, taskName: '', taskDescription: ''})
            setMessageError(null)
            setMessageSuccess('La tarea se Agrego con Exito')

            TimeMessage()
            GetTask()
                .then(TaskData =>{
                    setListTask(TaskData)
                })
        }
    }


    const Delete = async (item)=>{
        
        try {
            await DeleteTask(item)

            GetTask()
                .then(TaskData =>{
                    setListTask(TaskData)
                })
            
            setMessageSuccess('Se a Borrado la Tarea con existo')

            setaddTask({...addTask, taskName: '', taskDescription: ''})
            setModoEdicion(null)
            TimeMessage()
        } catch (error) {
            
        }
    }

    const Update = async(item)=>{
        await UpdateTask(item)
                .then(TaskData =>{
                    setaddTask({...addTask, taskName: TaskData.Name, 
                        taskDescription: TaskData.Descripcion})
                })

        setModoEdicion('Activo')
    }

    const SetUpdate = (eve)=>{
        eve.preventDefault()
        
        SetUpdateTask(ListTask)
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
