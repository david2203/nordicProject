import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import server from "../Global/config";
import axios from "axios";

const FileInput = () => {
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);
  // const profileImg ='https://gravatar.com/avatar/daaa57535a70b34bc8674de53d02dc25?s=200&d=mp&r=pg'

  // useEffect(() => {
  //   if (selectedImage) {
  //     setImageUrl(URL.createObjectURL(selectedImage));
  //   }
  // }, [selectedImage]);

  // if (imageUrl !== null) {
  //     let formData = new FormData();
  //     formData.append("file", imageUrl)
  //     const stringed = JSON.stringify(selectedImage)
  //     console.log(selectedImage)
  //     const putAvatar = async() => {
  //           const response = await instance.put (
  //               `Users/${userId}`,{
  //                   profilepicture: selectedImage
  //               }
  //           ).then((resp)=>console.log(resp))
  //     }
  //     putAvatar()
  // }
  const [files,setFiles] = useState()
 

  
  function handleOnChange(e) {
    setFiles(e.target.files[0])
  }

useEffect(() =>{
  const instance = axios.create({baseURL: server});
  const userId = localStorage.getItem("user_id");

  const uploadImage = async () => {
    const formData = new FormData()

    formData.append('files', files)
    
    console.log(files)
    instance.post("/upload", formData)
    .then((response)=>{
      console.log(response)
      const imageId = response.data[0].id

      instance.put(`/users/${userId}`,{profilepicture:imageId}).then((response)=>{
      response = window.location.reload()
      console.log(files)
      }).catch((error)=>{
          console.log(error)
        })
    }).catch((error)=>{
        //handle error
    })
}
  if(files){
    uploadImage()
  }

},[files])

        

  return (
    <>
                        {/* <img
  src={profileImg}
  class="img-fluid rounded-pill"
  alt=""
/> */}

      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: 'none' }}
        onChange={handleOnChange}
      />
      <label htmlFor="select-image" className="d-flex justify-content-start">
        <Button variant="contained" className="btn btn-secondary d-flex justify-content-start" component="span">
        <i className="fa fa-fw fa-camera"></i>
           Byt bild
        </Button>
      </label>
      {/* {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )} */}
     
    </>
  );
};

export default FileInput;