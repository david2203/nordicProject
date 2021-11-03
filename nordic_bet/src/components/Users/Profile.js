import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "../Global/config";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useHistory } from "react-router";
import Modal from 'react-bootstrap/Modal';
import { Parallax } from "react-parallax";
import ChangeImg from "./ChangeImg";




function Profile({username, firstname, lastname, adress, city, zipcode, country, email, created, profilepicture}) {
  console.log(profilepicture)
 const [url, setUrl] = useState('https://gravatar.com/avatar/a0310ba74bcd933a1f4a3cb00de31fea?s=400&d=mp&r=x')
useEffect(() => {
  if(profilepicture) {
    const profilePicUrl = profilepicture.formats.small.url
  setUrl(server + profilePicUrl)
  }
}, [])


console.log(url)
    const userId = localStorage.getItem("user_id");
    const history = useHistory();
    const instance = axios.create({baseURL: server});
    const [isChanging, setIsChanging] = useState(false);
    const [token] = useState(localStorage.getItem('jwt'));
    const [modalShow, setModalShow] = React.useState(false);


    const changePassword = {
        password: "",
        oldPassword: "",
        confirmPassword: ""
    }


    var editValues = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      adress: adress,
      city: city,
      zipcode: zipcode,
      country: country,
      email: email,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };

    const [editUserValue, setEditValue] = useState(editValues);
    console.log(editUserValue)


    
     
    function editUser(e) {
      e.preventDefault();

      const editUserValues = async () => {

        const response = await instance.put(
          `Users/${userId}`,
          {
            fname: editUserValue.firstname,
            lname: editUserValue.lastname,
            adress: editUserValue.adress,
            city: editUserValue.city,
            zipcode: editUserValue.zipcode,
            country: editUserValue.country,
            email: editUserValue.email
          }
        ).then(window.location.reload()) 
        

        console.log(response)
          
      }
      editUserValues();
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function onChangeUser(e) {
      setEditValue({...editUserValue, [e.target.name]: capitalizeFirstLetter(e.target.value) });
      
    }
    console.log(editUserValue)
    console.log(editUser)


    function deleteUser() {


      const deletePerson = async () => {

        const response = await instance.delete(
          `Users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(
          localStorage.clear(),
          history.push('/SignIn'),
          window.location.reload()
          
          );
        console.log(response);
      };
      deletePerson();
    }


    function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Du är påväg att radera ditt konto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Är du helt säker på att du vill radera ditt konto?
          <br/>
          Detta kommer resultera i att ditt konto försvinner helt från<br/>
          vår databas och du kommer inte att kunna återställa detta konto. 
          <br/>
          <br/>
          ∼ <i>Nordic Bet</i>
        </p>
      </Modal.Body>
      <Modal.Footer
      style={{
        display: "flex",
        justifyContent: "center"
      }}
      >

        <button onClick={props.onHide} className="btn btn-secondary" type="submit">
                        <i className="bi bi-x"></i>
                        <span> Tillbaka</span>
                        </button>
        <button className="btn btn-outline-danger"  onClick={deleteUser}>
                        <i className="bi bi-person-x-fill fa-lg"></i>
                          <span> Radera</span>
                        </button>

      </Modal.Footer>
    </Modal>
  );
}

    
    const image1 =
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80";


      const profileImg ='https://gravatar.com/avatar/daaa57535a70b34bc8674de53d02dc25?s=200&d=mp&r=pg'
    
    return (
        <>
  <Parallax bgImage={image1} strength={500}>
          <div style={{ height: "auto" }}></div>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
<div className="container mt-3">
<div className="row flex-lg-nowrap">
  <div className="col-12 col-lg-auto mb-3" style={{width: "50px"}}>
  </div>

  <div className="col" style={{ width: '40vw'}}>
    <div className="row">
      <div className="col mb-3">
        <div className="card">
          <div className="card-body">
            <div className="e-profile">
              <div className="row">
                <div className="col-12 col-sm-auto mb-3">
                  <div className="mx-auto" style={{width: "140px"}}>
                    <div className="d-flex justify-content-center align-items-center " style={{height: "20px"}}/>
                    <img
  src={url}
  style={{width: '150px',
          height: '150px',
          backgroundSize: 'cover',
          display: 'block',
          objectFit: 'cover'
          }}
          className='rounded-circle'
  alt=""
/>
                    
                    </div>
                  </div>
                </div>
                <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                  <div className="text-center text-sm-left mb-2 mb-sm-0">
                    <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{firstname} {lastname}</h4>
                    <p className="mb-0">Användarnamn: {username}</p>
                    <div className="mt-2">
                      
                      {/* <FileUploader/> */}
                      <ChangeImg/>
                    </div>
                  </div>
                  <div className="text-center text-sm-right">
                    <div className="text-muted"><small>Konto skapat <br/>{created}</small></div>
                  </div>
                </div>
              </div>
              <ul className="nav nav-tabs">
                <li className="nav-item"><a href="" className="active nav-link">Inställningar</a></li>
              </ul>
              <div className="tab-content pt-3">
                <div className="tab-pane active">
                  <form className="form" noValidate="">
                    <div className="row">
                      <div className="col">

                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Förnamn</label>
                              <input className="form-control" type="text" name="firstname" value={editUserValue.firstname} onChange={onChangeUser}/>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label>Efternamn</label>
                              <input className="form-control" type="text" name="lastname" value={editUserValue.lastname} onChange={onChangeUser}/>
                            </div>
                          </div>
                        </div>

                            {/* För & Efternamn ovan */}

                            <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Adress</label>
                              <input className="form-control" type="text" name="adress" value={editUserValue.adress} onChange={onChangeUser}/>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label>Stad</label>
                              <input className="form-control" type="text" name="city" value={editUserValue.city} onChange={onChangeUser}/>
                            </div>
                          </div>
                        </div>

                        {/* Adress & Stad ovan */}

                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Postnr</label>
                              <input className="form-control" type="number" name="zipcode" value={editUserValue.zipcode} onChange={onChangeUser}/>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label>Land</label>
                              <input className="form-control" type="text" name="country" value={editUserValue.country} onChange={onChangeUser}/>
                            </div>
                          </div>
                        </div>

                           {/* Postnr & land ovan */}

                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>E-postadress</label>
                              <input className="form-control" type="text" name="email" value={editUserValue.email} onChange={onChangeUser}/>
                            </div>
                          </div>
                        </div>
                        <br/>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mb-2"><b>Ändra lösenord</b></div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Nuvarande Lösenord</label>
                              <input className="form-control" type="password" name="currentPassword" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Nytt Lösenord</label>
                              <input className="form-control" type="password" name="newPassword" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Bekräfta <span className="d-none d-xl-inline">Nytt Lösenord</span></label>
                              <input className="form-control" type="password" name="confirmNewPassword"/></div>
                          </div>
                        </div>
                      </div>

                        <div className="mb-2"><b>Keeping in Touch</b></div>
                      </div>


                  </form>

                </div>
                <div className="col d-flex justify-content-between">
                <button className="btn btn-secondary" type="submit">
                        <i className="bi bi-gear-wide fa-lg"></i>
                        <span> Ändra lösenord</span>
                        </button>
                        <button className="btn btn-primary" type="submit" onClick={editUser}>Spara inställningar</button>
                      




  
<button className="btn btn-outline-danger" onClick={() => setModalShow(true)}>
<i className="bi bi-person-x-fill fa-lg"></i>
<span> Radera konto</span>
      </button>
      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

</Parallax>
        </>
    )
}

export default Profile
