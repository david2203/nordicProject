import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import visa from "../img/visa.png"
import mastercard from "../img/mastercard.png"
import skrill from "../img/skrill.png"
import trustly from "../img/trustly.png"


function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function Footer() {
    return (
        <>

<footer className="text-center text-lg-start p-3 mb-2 bg-light">

  <section
    className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
  >

    <div className="me-5 d-none d-lg-block ">
      <span>Kontakta oss på sociala nätverk:</span>
    </div>
      
    <div>
    <Link to="/facebook" className="me-4 text-reset"> <i className="bi bi-facebook"></i></Link>
    <Link to="/twitter" className="me-4 text-reset"> <i className="bi bi-twitter"></i></Link>
    <Link to="/google" className="me-4 text-reset"> <i className="bi bi-google"></i></Link>
    <Link to="/instagram" className="me-4 text-reset"> <i className="bi bi-instagram"></i></Link>
    <Link to="/linkedin" className="me-4 text-reset"> <i className="bi bi-linkedin"></i></Link>
    <Link to="/github" className="me-4 text-reset"> <i className="bi bi-github"></i></Link>
    </div>

  </section>

  <section className="">
    <div className="container text-center text-md-start mt-5">

      <div className="row mt-3">

        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

          <h6 className="text-uppercase fw-bold mb-4">
            <i className="bi bi-gem me-3"></i> Om Nordic Bet
          </h6>
          <p>
            Vi är ledande inom fantasy betting i norden! 
            Du har möjlighet att betta på flera olika spel under vårat nuvariga event. <br/>  <strong>'EURO 2016 Reimagined'</strong>
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto ">

          <h6 className="text-uppercase fw-bold mb-3">
            Sammarbeten:
          </h6>
          <p>
            <img src={visa} width="70px" alt="visa icon"></img>
          </p>
          <p>
          <img src={trustly} width="70px" alt="trustly icon"></img>

          </p>
          <p>
          <img src={skrill} width="70px" alt="skrill icon"></img>

          </p>
          <p>
          <img src={mastercard} width="70px" alt="mastercard icon"></img>
          </p>
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

          <h6 className="text-uppercase fw-bold mb-4">
            Länkar:
          </h6>
          <p>
          <Link to="/TermsConditions" onClick={scrollToTop} className="text-reset"> Regler & Vilkor</Link>

          </p>
          <p>
          <Link to="/manual" onClick={scrollToTop} className="text-reset"> Manual </Link>

          </p>
          <p>
          <Link to="/stödlinjen" className="text-reset"> Stödlinjen.se </Link>
          </p>
          <p>
          <Link to="/Kontakt" onClick={scrollToTop} className="text-reset"> Kontakta oss </Link>

          </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

          <h6 className="text-uppercase fw-bold mb-4">
           Kontakt
          </h6>
          <p><i className="bi bi-house me-3"></i> Stockholm, 14256, SE</p>
          <p>
            <i className="bi bi-envelope me-3"></i>
            info@nordicteam.com
          </p>
          <p><i className="bi bi-phone me-3"></i> + 46 234 567 88</p>
          <p><i className="bi bi-printer me-3"></i> + 46 234 567 89</p>
        </div>

      </div>

    </div>
  </section>

  <div className="text-center p-4"/>
    © 2021 Copyright
</footer>

        </>
        
    )
}

export default Footer;
