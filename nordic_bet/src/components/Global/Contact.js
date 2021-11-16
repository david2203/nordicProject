import React from "react";
import emailjs from "emailjs-com";


function Contact() {
  
  function sendMessage(e) {
    e.preventDefault();

    emailjs.sendForm('service_z8sqxi9', 'template_y03d36e', e.target, 'user_wnDYkMS4bE8n5c5pygE8r')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset()
  }
  return (
    <div style={{ height: "auto" }} className="min-vh-100 bg-dark">
      <br />
      <div className="container">
        <form
          onSubmit={sendMessage}
          className="header bg-light w-75 border mx-auto mt-3"
          style={{ opacity: "70%" }}
        >
          <h2 className="mt-5">
            <u> Medelande: </u>
          </h2>
          <div className="row pt-5 mx-auto">
              <div className="col-8 form-group mx-auto">
                  <input type="text" className="form-control" placeholder="Namn" name="name"></input>
              </div>
              <div className="col-8 form-group pt-2 mx-auto">
                  <input type="text" className="form-control" placeholder="Email Adress" name="email"></input>
              </div>
              <div className="col-8 form-group pt-2 mx-auto">
                  <input type="text" className="form-control" placeholder="Ämne" name="subject"></input>
              </div>
              <div className="col-8 form-group pt-2 mx-auto">
              <textarea
                    placeholder="Skriv ditt medelande här!"
                    name="message"
                    cols="30"
                    rows="8"
                    className="form-control"
                ></textarea>
              </div>
              <div className="col-8 form-group pt-2 mx-auto">
            <input type="submit" className="btn btn-info" values="  ">
              
            </input>
            </div>
          </div>
          
          <br />
        
        </form>
      </div>
    </div>
  );
}

export default Contact;
