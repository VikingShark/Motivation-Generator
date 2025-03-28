async function getAdvice() {

    try{
        // Testa att göra ett api anrop (GET request)
        const response = await fetch ("https://api.adviceslip.com/advice");

        //Om inte anropet lyckades
        if(!response.ok) {
            throw new Error ("Något gick fel, försök igen senare")
        }

        // spara svaret i en ny variabel som JSON objekt
        const advice = await response.json();
        return advice;
        
    } catch (error) {
        genAdvice.innerText = error.message;
        console.error("Kunde inte hämta råd:", error.message);
    }
}

window.onload = function() {
    let loading = false;
    const genAdvice = document.getElementById("advice-text");
    const genAdviceId = document.getElementById("advice-number");
    const genBtn = document.getElementById("advice-button");
    const expandBtn = document.getElementById("expand-button");
    const expandContainer = document.getElementById("main-container");
    const adviceContainer =  document.getElementById("advice-container");
    
    expandBtn.style.visibility = "hidden";

    genBtn.addEventListener("click", async function(){
        loading = true;
        if(loading){
            genAdvice.innerText = "Loading...";
        };
        const advice = await getAdvice();

        if (window.matchMedia('screen and (max-width:480px)').matches) {
            expandContainer.style.height = "290px";
        } else {
            expandContainer.style.height = "330px";
        }

        adviceContainer.style.height = "180px";
        genAdvice.innerText = '"' + advice.slip.advice + '"';
        genAdviceId.innerText = "ADVICE #" + advice.slip.id;
        loading = false;

       
        if (genAdvice.innerText.length > 75) {
            expandBtn.style.visibility ="visible";
        } else {
            expandBtn.style.visibility ="hidden";
        }   
    });

    function expandAdviceContainer() {
        expandContainer.style.height = "450px";
        adviceContainer.style.height = "260px";
        expandBtn.style.visibility ="hidden";
    }

    expandBtn.addEventListener("click", expandAdviceContainer);


}





