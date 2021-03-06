import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useHistory } from "react-router";
import Modal from "react-bootstrap/Modal";
import { Parallax } from "react-parallax";
import ChangeImg from "./ChangeImg";

function Profile({
  username,
  firstname,
  lastname,
  adress,
  city,
  zipcode,
  country,
  email,
  created,
  profilepicture,
  score
}) {
  const [url, setUrl] = useState(
    "https://gravatar.com/avatar/a0310ba74bcd933a1f4a3cb00de31fea?s=400&d=mp&r=x"
  );
  useEffect(() => {
    if (profilepicture) {
      const profilePicUrl = profilepicture.formats.small.url;
      setUrl(server + profilePicUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const splitCreated = created.split("T")
  const userId = localStorage.getItem("user_id");
  const history = useHistory();
  const instance = axios.create({ baseURL: server });
  const [token] = useState(localStorage.getItem("jwt"));
  const [modalShow, setModalShow] = React.useState(false);

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
    confirmNewPassword: "",
  };

  const [editUserValue, setEditValue] = useState(editValues);

  function editUser(e) {
    e.preventDefault();

    const editUserValues = async () => {
      await instance
        .put(`Users/${userId}`, {
          fname: editUserValue.firstname,
          lname: editUserValue.lastname,
          adress: editUserValue.adress,
          city: editUserValue.city,
          zipcode: editUserValue.zipcode,
          country: editUserValue.country,
          email: editUserValue.email,
        })
        .then(window.location.reload());
    };
    editUserValues();
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function onChangeUser(e) {
    setEditValue({
      ...editUserValue,
      [e.target.name]: capitalizeFirstLetter(e.target.value),
    });
  }

  function deleteUser() {
    const deletePerson = async () => {
      const response = await instance
        .delete(`Users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(
          localStorage.clear(),
          history.push("/SignIn"),
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
            Du ??r p??v??g att radera ditt konto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ??r du helt s??ker p?? att du vill radera ditt konto?
            <br />
            Detta kommer resultera i att ditt konto f??rsvinner helt fr??n
            <br />
            v??r databas och du kommer inte att kunna ??terst??lla detta konto.
            <br />
            <br />??? <i>Nordic Bet</i>
          </p>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            onClick={props.onHide}
            className="btn btn-secondary"
            type="submit"
          >
            <i className="bi bi-x"></i>
            <span> Tillbaka</span>
          </button>
          <button className="btn btn-outline-danger" onClick={deleteUser}>
            <i className="bi bi-person-x-fill fa-lg"></i>
            <span> Radera</span>
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  const image1 =
    "https://images.unsplash.com/photo-1529900672901-908be5302554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80";

  return (
    <>
      <Parallax key="" bgImage={image1} strength={500}>
        <div style={{ height: "auto" }}></div>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="container mt-3">
          <div className="row flex-lg-nowrap">
            <div
              className="col-12 col-lg-auto mb-3"
              style={{ width: "50px" }}
            ></div>

            <div className="col" style={{ width: "40vw" }}>
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <div className="row">
                          <div className="col-12 col-sm-auto mb-3">
                            <div className="mx-auto" style={{ width: "140px" }}>
                              <div
                                className="d-flex justify-content-center align-items-center "
                                style={{ height: "20px" }}
                              />
                              <img
                                src={url}
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  backgroundSize: "cover",
                                  display: "block",
                                  objectFit: "cover",
                                }}
                                className="rounded-circle"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                              {firstname} {lastname}
                            </h4>
                            <p className="mb-0">{username}</p>
                    <p className="mb-0">Po??ng: {score}</p>
                     
                            <br/><div className="mt-2">
                              {/* <FileUploader/> */}
                              <ChangeImg />
                            </div>
                          </div>
                          <div className="text-center text-sm-right fs-6">
                            <div className="font-monospace">

                                Konto skapat <br />
                                {splitCreated[0]}

                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a href="temptdata" className="active nav-link">
                            Inst??llningar
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" noValidate="">
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>F??rnamn</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="firstname"
                                        value={editUserValue.firstname}
                                        onChange={onChangeUser}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Efternamn</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="lastname"
                                        value={editUserValue.lastname}
                                        onChange={onChangeUser}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* F??r & Efternamn ovan */}

                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Adress</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="adress"
                                        value={editUserValue.adress}
                                        onChange={onChangeUser}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Stad</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="city"
                                        value={editUserValue.city}
                                        onChange={onChangeUser}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Adress & Stad ovan */}

                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Postnr</label>
                                      <input
                                        className="form-control"
                                        type="number"
                                        name="zipcode"
                                        value={editUserValue.zipcode}
                                        onChange={onChangeUser}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Land</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="country"
                                        value={editUserValue.country}
                                        onChange={onChangeUser}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Postnr & land ovan */}

                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>E-postadress</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        value={editUserValue.email}
                                        onChange={onChangeUser}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <br />
                              </div>
                            </div>
                           
                          </form>
                        </div>
                        <div className="col d-flex justify-content-between">

                          <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={editUser}
                          >
                            Spara inst??llningar
                          </button>

                          <button
                            className="btn btn-outline-danger"
                            onClick={() => setModalShow(true)}
                          >
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
  );
}

export default Profile;
