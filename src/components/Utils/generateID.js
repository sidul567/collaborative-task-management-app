export const generateID = ()=>{
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const id = `${timestamp}${random}`

    return id;
}