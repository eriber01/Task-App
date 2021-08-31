import { FirebaseStorage } from "./FirebaseConfig"

const GetTask = async ()=>{
    const {docs} = await FirebaseStorage.collection('Task').get()
    const TaskData = docs.map(item=>({id: item.id, ...item.data()}))
    
    return TaskData
}


export default GetTask