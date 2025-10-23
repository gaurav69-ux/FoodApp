// SDK initialization

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_KEY_ENDPOINT
});

async function uploadFile(file, fileName) {
    const result = await imagekit.upload({
        file: file, 
        fileName: fileName,
    });
    // console.log("result: ",result);  // always use "console.log" berfore the "return".  
   
    return result;  //return the url of the uploded file
    
}

module.exports = {
    uploadFile
};