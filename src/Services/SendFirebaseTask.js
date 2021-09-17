import { FirebaseStorage } from "./FirebaseConfig";

const SendFirebaseTask = async (TaskData, UserCollection) =>{

    const Data = {
        TaskDescription: TaskData.taskDescription,
        TaskName: TaskData.taskName
    }
    
    await FirebaseStorage.collection(UserCollection).add(Data)
}

export default SendFirebaseTask