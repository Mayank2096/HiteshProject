// 1.  while dealing with files , we take it from Client accept it .
// 2. Put this file in our local server and then,
// 3. Pass it to cloud service ie.. cloudinary or Amazon S3
// 4. Once placed there and as it is safely stored, 
// 5. We will delete it from local db to reduce burden.

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";  // fs in inbuilt fileSystem with NodeJs which allows dealing with files.


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });


const uploadOnCloudinary = async(localFilePath) =>{

    try {
        // check whether file path exists ?
        if(!localFilePath) return null;
        // Yes exists, then upload it !
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"        
        })
        // File uploaded successfully
        console.log("File is uploaded on cloudinary", response.url);
        return response;
    } catch (error) {
        // error in uploading file , now we will ask user to upload again thus,
        // we will remove previously got file.
        fs.unlinkSync(localFilePath);
        return null; 
    }
}

export default uploadOnCloudinary ;