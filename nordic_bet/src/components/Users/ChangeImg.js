import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import server from "../Global/config";
import axios from "axios";

const FileInput = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const profileImg ='https://gravatar.com/avatar/daaa57535a70b34bc8674de53d02dc25?s=200&d=mp&r=pg'
  const instance = axios.create({baseURL: server});
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  if (imageUrl !== null) {
      let formData = new FormData();
      formData.append("file", imageUrl)
      const stringed = JSON.stringify(selectedImage)
      console.log(selectedImage)
      const putAvatar = async() => {
            const response = await instance.put (
                `Users/${userId}`,{
                    profilepicture: selectedImage
                }
            ).then((resp)=>console.log(resp))
      }
      putAvatar()
  }

  return (
    <>
                        <img
  src={profileImg}
  class="img-fluid rounded-pill"
  alt=""
/>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: 'none' }}
        onChange={e => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )}
    </>
  );
};

export default FileInput;