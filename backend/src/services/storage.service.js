const Imagekit = require("imagekit");
const multer = require('multer');

const imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_KEY_ENDPIONT
});

async function uploadFile(file, fileName) {
    const result = await imagekit.upload({
        file: file, 
        fileName: fileName,
    });
    
    return result;  //return the url of the uploded file
    console.log(result);
}



module.exports = {
    uploadFile
}