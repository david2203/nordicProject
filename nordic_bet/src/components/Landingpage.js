import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

function Landingpage() {
  return (
    <>
    
    <div className="bodyPage">
      <div class="site-wrapper">
        <div class="site-wrapper-inner">
          <div class="container">
            <div class="masthead clearfix">
              <div class="container inner">
              </div>
            </div>
          
            <div className="inner cover min-vh-100" style={{ height: "auto"}}>
              <h1 class="cover-heading">
                Välkommen till Nordic Bet <br /> Svergies mest omnämnda
                spelbolag{" "}
              </h1>
              <br/>
              <p class="lead">
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
              <p class="lead">
                <Link to="/Games" class="btn btn-lg btn-default">
                  Kolla runt om kommande spel
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Landingpage;
