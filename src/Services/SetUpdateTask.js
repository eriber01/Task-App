import { FirebaseStorage } from "./FirebaseConfig";

const SetUpdateTask = async (TaskData, id) =>{

    const Data = {
        TaskName: TaskData.taskName,
        TaskDescription: TaskData.taskDescription
    }

    await FirebaseStorage.collection('Task').doc(id).set(Data)
}

export default SetUpdateTask;