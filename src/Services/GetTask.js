import { FirebaseStorage } from "./FirebaseConfig"

const GetTask = async (UserCollection)=>{
    //console.log(UserCollection + ' get data');
    
    const {docs} = await FirebaseStorage.collection(UserCollection).get()
    const TaskData = docs.map(item=>({id: item.id, ...item.data()}))
    
    return TaskData
}


export default GetTask