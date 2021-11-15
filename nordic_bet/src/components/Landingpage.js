import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

function Landingpage() {
  return (
    <>
    
    <div className="bodyPage">
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="container">
            <div className="masthead clearfix">
              <div className="container inner">
              </div>
            </div>
          
            <div className="inner cover min-vh-100" style={{ height: "auto"}}>
              <h1 className="cover-heading">
                Välkommen till Nordic Bet <br /> Svergies mest omnämnda
                spelbolag{" "}
              </h1>
              <br/>
              <p className="lead">
                Med mer än 50 år i branschen vet vi vad du vill ha –
                underhållning. Det är därför vi har skapat detta projekt
                <br />
                <strong>EURO 2016 omarbetad!</strong>
                <br />
                <br/>
                Vi vet att en enkel satsning kan förvandla vilket spel som helst
                till en våg av känslor. Därför ger vi dig detta evenemang där du
                kan satsa på resultatet av spelen 2016. Lägg ett spel innan
                spelet startar, eller prova ett livespel medan du tittar. Kolla
                in spelsidan när vi uppdaterar det kommande spel dagligen.
              </p>
              <div className="lead">
                <Link to="/Games" className="btn btn-lg btn-default">
                  Kolla runt om kommande spel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Landingpage;
