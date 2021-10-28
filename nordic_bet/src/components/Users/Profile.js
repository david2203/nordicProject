import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "../Global/config";
import 'bootstrap-icons/font/bootstrap-icons.css';



function Profile({firstname, lastname}) {

  console.log(lastname)

    const getUsername = localStorage.getItem("username");
    const [userId, setUserId] = useState(localStorage.getItem("user_id"))
    const [fname, setFname] = useState()
    const instance = axios.create({baseURL: server});


   
    



    var editValues = {
      firstname: firstname,
      lastname: lastname,
      adress: "",
      city: "",
      zipcode: "",
      town : "",
      country: "",
      email: "",
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
          `Users?id=${userId}`,
          {
            firstname: editUserValue.firstname,
            lastname: editUserValue.lastname,
          }
        ).then(window.location.reload());

        console.log(response)

      }
      editUserValues();
    }

    function onChangeUser(e) {
      setEditValue({...editUserValue, [e.target.name]: e.target.value });
    }
    console.log(editUserValue)

    // useEffect( ()=> {
    //     const fetchUsername = async () => {
    //         const response = await instance.get (`users?id`);
            
    //         console.log(response);


 
    //     };
    //     fetchUsername();
    // })
    
    return (
        <>

            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
<div className="container">
<div className="row flex-lg-nowrap">
  <div className="col-12 col-lg-auto mb-3" style={{width: "200px"}}>
  </div>

  <div className="col">
    <div className="row">
      <div className="col mb-3">
        <div className="card">
          <div className="card-body">
            <div className="e-profile">
              <div className="row">
                <div className="col-12 col-sm-auto mb-3">
                  <div className="mx-auto" style={{width: "140px"}}>
                    <div className="d-flex justify-content-center align-items-center rounded" style={{height: "140px"}}/>
                      <span style={{color: "rgb(166, 168, 170)"}}>140x140</span>
                    </div>
                  </div>
                </div>
                <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                  <div className="text-center text-sm-left mb-2 mb-sm-0">
                    <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">För-Efternamn</h4>
                    <p className="mb-0">{getUsername}</p>
                    <div className="mt-2">
                      <button className="btn btn-primary" type="button">
                        <i className="fa fa-fw fa-camera"></i>
                        <span>Change Photo</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-center text-sm-right">
                    <div className="text-muted"><small>Joined 09 Dec 2017</small></div>
                  </div>
                </div>
              </div>
              <ul className="nav nav-tabs">
                <li className="nav-item"><a href="" className="active nav-link">Settings</a></li>
              </ul>
              <div className="tab-content pt-3">
                <div className="tab-pane active">
                  <form className="form" novalidate="">
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
                              <input className="form-control" type="text" name="name" placeholder="John Smith"/>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label>Stad</label>
                              <input className="form-control" type="text" name="username" placeholder="johnny.s"/>
                            </div>
                          </div>
                        </div>

                        {/* Adress & Stad ovan */}

                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Postnr</label>
                              <input className="form-control" type="number" name="name" placeholder="John Smith"/>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label>Land</label>
                              <input className="form-control" type="text" name="username" placeholder="johnny.s"/>
                            </div>
                          </div>
                        </div>

                           {/* Postnr & land ovan */}

                           <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Språk</label>
                              <input className="form-control" type="text" name="name" placeholder="Svenska"/>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label>Tidzon</label>
                              <input className="form-control" type="text" name="username" placeholder="CET"/>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>E-postadress</label>
                              <input className="form-control" type="text" placeholder="user@example.com"/>
                            </div>
                          </div>
                        </div>
                        <br/>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6 mb-3">
                        <div className="mb-2"><b>Byt lösenord</b></div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Nuvarande Lösenord</label>
                              <input className="form-control" type="password" placeholder="••••••"/>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Nytt Lösenord</label>
                              <input className="form-control" type="password" placeholder="••••••"/>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label>Bekräfta <span className="d-none d-xl-inline">Lösenord</span></label>
                              <input className="form-control" type="password" placeholder="••••••"/></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-5 offset-sm-1 mb-3">
                        <div className="mb-2"><b>Keeping in Touch</b></div>
                        <div className="row">
                          <div className="col">
                            <label>Email Notifications</label>
                            <div className="custom-controls-stacked px-2">
                              <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="notifications-blog" checked=""/>
                                <label className="custom-control-label" for="notifications-blog">Blog posts</label>
                              </div>
                              <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="notifications-news" checked=""/>
                                <label className="custom-control-label" for="notifications-news">Newsletter</label>
                              </div>
                              <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="notifications-offers" checked=""/>
                                <label className="custom-control-label" for="notifications-offers">Personal Offers</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col d-flex justify-content-end">
                        <button className="btn btn-primary" type="submit">Spara inställningar</button>
                      </div>
 <br/>


                      <div className="col d-flex justify-content-start">
                        <button className="btn btn-outline-danger" type="submit">
                        <i className="bi bi-person-x-fill fa-lg"></i>
                          <span> Radera konto</span>
                        </button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
        </>
    )
}

export default Profile
