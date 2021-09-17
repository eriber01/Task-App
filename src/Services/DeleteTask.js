import { FirebaseStorage } from "./FirebaseConfig";

const DeleteTask = async (item, UserCollection)=>{
    FirebaseStorage.collection(UserCollection).doc(item).delete()
}

export default DeleteTask