const axios = require ('axios').default;

async function getTasks(){
    let list;
    try {
        const {data} = await axios.get('http://localhost:3000/');

        list = data?.data;
        return data;
        
    } catch (error) {
        console.log(error);
    }
    
}

export default getTasks;