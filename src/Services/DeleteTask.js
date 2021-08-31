import { FirebaseStorage } from "./FirebaseConfig";

const DeleteTask = async (item)=>{
    FirebaseStorage.collection('Task').doc(item).delete()
}

export default DeleteTask