export default fetch = (url) => {
    console.log("ACDC", url);
    return new Promise((resolve, reject) => {
        const response = {
            ok: true,
            text: () => {
                return "This is a mocked response text";
            }
        };

        
        process.nextTick(() => {
            if(response.ok === true){
                console.log("Izanagi");
                resolve(response);
            } else {
                console.log("Izanami");
                reject({type: "reject"});   
            }
        }) 
        
    })
}