import { FirebaseStorage } from "./FirebaseConfig";

const SendFirebaseTask = async (TaskData) =>{

    const Data = {
        TaskDescription: TaskData.taskDescription,
        TaskName: TaskData.taskName
    }

    await FirebaseStorage.collection('Task').add(Data)
}

export default SendFirebaseTask