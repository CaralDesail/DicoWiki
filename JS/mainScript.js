let motRechercheInput=document.getElementById('motRechercheInput');
let envoyerButton=document.getElementById('envoyerButton');
let retourDuTexte=document.getElementById('retourDuTexte');
let nouvelleChaine;
var url = "https://fr.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    prop: "revisions",
    titles: "Contenu",
    rvslots: "*",
    rvprop:"content",
    formatversion:"2",
    format: "json"
};


envoyerButton.onclick= function () {
    url = url + "?origin=*";
    params.titles=motRechercheInput.value
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        if (response){
            console.log(response); // reponse globale
            chaine=response.query.pages[0].revisions[0].slots.main.content; //contenu précis
            if (chaine.indexOf("\n\n")<500 && chaine.indexOf("\n\n")>5){ //on retire les entetes
            nouvelleChaine=chaine.slice(chaine.indexOf("\n\n"));} else nouvelleChaine=chaine
            console.log('Index du caractère recherché :'+nouvelleChaine.indexOf("]]"))

            const regex1= /\[\[|\]\]|\*|\{\{|\}\}|\'\'/g; //expression regulière qui cherche les caractères spéciaux de formatage wikipedia
            
            nouvelleChaine=nouvelleChaine.replaceAll(regex1,''); //remplacement des balises wikipédia par "" pour donner une allure plus lisible
            nouvelleChaine=nouvelleChaine.replaceAll('\n','<br>');
            // il doit y avoir un moyen plus élégant avec les parseurs de faire ce travail ... 

        }
        retourDuTexte.innerHTML=nouvelleChaine; // 

    })
    .catch(function(error){console.log(error);});


}   

/*

var params = {
    action: "query",
    list: "search",
    srsearch: "Contenu",
    format: "json"
};


envoyerButton.onclick= function () {
    url = url + "?origin=*";
    params.srsearch=motRechercheInput.value
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        if (response){
            console.log("Le recherche du mot existe" );
            console.log(response)
            console.log(response.query.search[0].snippet)
        }
        retourDuTexte.innerHTML=response.query.search[0].snippet+" ...";

    })
    .catch(function(error){console.log(error);});


}   
*/