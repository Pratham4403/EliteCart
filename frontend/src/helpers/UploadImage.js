const URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const UploadImage = async(image)=>{
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset","elitecart_products");
    const dataResponse = await fetch(URL,{
        method:"post",
        body : formData
    })
    return dataResponse.json();
}

export default UploadImage;