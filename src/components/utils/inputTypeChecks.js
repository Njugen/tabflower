const isEmptyString = (input) => {
    if(typeof input === "string"){
        if(input.length === 0 || input.replace(/ /g, "").length === 0){
            return true;
        } else {
            false
        }
    } else {
        return false;
    }
}