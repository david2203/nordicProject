import React from 'react';
import styled from 'styled-components';
const Button = styled.button`

`;

const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  const profileImg ='https://gravatar.com/avatar/daaa57535a70b34bc8674de53d02dc25?s=200&d=mp&r=pg'

 let imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        if(reader.readyState === 2) {
            this.setState({profileImg: reader.result})
        }
    }
    reader.readAsDataURL(e.target.files[0])
  }


  return (
    <>
      <Button className="btn btn-secondary d-flex justify-content-start " type="button" onClick={handleClick}>
                        <i className="fa fa-fw fa-camera"></i>
        Byt bild
      </Button>
      <input type="file" accept="image/*" id="input"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
    </>
  );
};
export default FileUploader;
