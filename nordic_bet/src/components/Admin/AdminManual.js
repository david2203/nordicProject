import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";

// a manual for the administrator of the games on how he should proceed with the event.
function AdminManual() {
  const [isAdmin, setIsAdmin] = useState(false);

  //checking if user has admin authority
  useEffect(() => {
    const instance = axios.create({ baseURL: server });
    const userId = localStorage.getItem("user_id");
    if (userId !== null) {
      const fetchRole = async () => {
        const response = await instance.get(`/users?id=${userId}`);
        setIsAdmin(response.data[0].isAdmin);
      };
      fetchRole();
    }
  }, []);

  return (
    /* Steps for the admin to follow when administrating the event */
    <>
      <div style={{ height: "auto", color: "black" }} className="min-vh-100">
        {isAdmin ? (
          <div style={{ height: "auto" }} className="min-vh-100 bg-dark">
            <br />
            <div
              className="header bg-light w-75 border mx-auto mt-3"
              style={{ opacity: "70%" }}
            >
              {" "}
              <h2 className="m-3">
                <u>Admin Manual </u>
              </h2>
              <p className="m-5">
                <strong>1. Rättning:</strong> Som Admin har du många
                rättigheter, en av dessa viktigaste rättigheter är att rätta
                spelen. För att rätta spelen så att gruppfaserna står som
                "Kvalificerade eller Diskvalificerade" Så behöver du först.
                Rätta alla spel via "Adminpanel" -&gt; Rätta spel -&gt; Updatera
                ALLA spel. Efter det så går du via Adminpanelen -&gt; Uppdatera
                kval och klickar på "Uppdatera från gruppspel till eliminering"
                Sedan är du klar och kan kika in statusen på "Brackets" -&gt;
                "Grupper"
              </p>
              <p className="m-5">
                <strong>2. Nollstäl event:</strong> Att nollställa eventet när
                något snett skulle ske, så finns möjligheten där. Den finns
                under fliken Adminpanel -&gt; "Nollställ Event." När du klickar på
                den röda knappen så görs en laddning och hela EM eventet
                nollställs.
              </p>
              <p className="m-5">
                <strong>3. Uppdatera kval:</strong> Uppdatera kval. Det finns
                ytterliga en punkt att klicka sig igenom via Adminpanelen. Det
                är den självaste "Uppdatera kval" Där inne kommer du att kunna
                Uppdatera status och eliminationen beroende på vilka spel du har
                rättat. Har du inte rättat något spel så kommer inget att
                uppdateras. Det finns Alla möjliga uppdateraringar från
                gruppspel till final att uppdatera.
              </p>
              <p className="m-5">
                <strong>4:</strong> Du kan följa spelens uppställning via länken
                "Brackets" - (Grupp/Eliminering) och även din ranking som user
                via länken "Topplista"
              </p>
              <p className="m-5">
                <strong>5:</strong> Du kan ändra ditt användarnamn samt din
                avatar under "profil" för att välja hur du ska visas upp i topp
                listan{" "}
              </p>
              <p className="m-5">
                <strong>6:</strong> Dina bets ser du under "Mina Bets". Du kan
                alltid ångra ett bet om det inte har rättats än genom att deleta
                det (Bara Akriva bets){" "}
              </p>
            </div>
          </div>
        ) : (
          <h1 className="pt-5 display-1">
            404: <br />
            Not Found
          </h1>
        )}
      </div>
    </>
  );
}

export default AdminManual;
