function jsonExists(){
    try {
        const jsonDB = JSON.parse(localStorage.getItem('todoDB'));
        // console.log(JSON.parse(jsonDB));
        return jsonDB;
    } catch (error) {
        console.log(error);
    }
}

export default jsonExists;