import { FirebaseStorage } from "./FirebaseConfig";

const SetUpdateTask = async (TaskData, id, UserCollection) =>{

    const Data = {
        TaskName: TaskData.taskName,
        TaskDescription: TaskData.taskDescription
    }

    await FirebaseStorage.collection(UserCollection).doc(id).set(Data)
}

export default SetUpdateTask;