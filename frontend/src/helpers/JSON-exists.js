function jsonExists(){
    try {
        const jsonDB = JSON.parse(localStorage.getItem('to-doDB'));
        // console.log(JSON.parse(jsonDB));
        return jsonDB;
    } catch (error) {
        console.log(error);
    }
}

export default jsonExists;