import { FirebaseStorage } from "./FirebaseConfig";

const UpdateTask = async (item)=>{
    const data = await FirebaseStorage.collection('Task').doc(item).get()
    const {TaskDescription, TaskName} = data.data()
    
    const TaskData = {
        Descripcion: TaskDescription,
        Name: TaskName
    }
    return TaskData
}

export default UpdateTask