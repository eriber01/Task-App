import { FirebaseStorage } from "./FirebaseConfig";

const UpdateTask = async (item, UserCollection)=>{
    console.log(UserCollection);
    const data = await FirebaseStorage.collection(UserCollection).doc(item).get()
    const {TaskDescription, TaskName} = data.data()
    
    const TaskData = {
        Descripcion: TaskDescription,
        Name: TaskName
    }
    return TaskData
}

export default UpdateTask