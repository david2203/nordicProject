import React, { useEffect} from 'react'

function Timegame() {
    var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15,36, 0, 0) - now;
if (millisTill10 < 0) {
     millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
}
function showConsole() {
    counter +=1
    console.log(counter) 
    if(counter === 1) {
        console.log("hej")
    }
}
var counter = 0
useEffect(() => {
    const timer = setTimeout(() => {
        showConsole()
    }, millisTill10);

    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


    return (
        <div>
            
        </div>
    )
}

export default Timegame
