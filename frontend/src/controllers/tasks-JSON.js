
async function getTasks(){
    let list;
    try {
        
        list = data?.data;
        return list;
        
    } catch (error) {
        console.log(error);
    }
    
}

export default getTasks;