// Application div
const routes = {},
    templates = {},
    template = (name, templateFunction) => {
        return templates[name] = templateFunction;
    },
    route = (path, template) => {
        if (typeof template == "function") {
            return routes[path] = template;
        }
        else if (typeof template == "string") {
            return routes[path] = templates[template];
        }
        else {
            return;
        }
    };

// Give the correspondent route (template) or fail
let resolveRoute = (route) => {
    try {
        return routes[route];
    } catch (error) {
        throw new Error("The route is not defined");
    }
};// The actual router, get the current URL and generate the corresponding template

let router = (evt) => {
    const url = window.location.hash.slice(1) || "/";
    const routeResolved = resolveRoute(url);
    routeResolved();
};

window.addEventListener('DOMContentLoaded',(event) => {
    const myDiv = document.getElementById("app");
    // Register the templates.
    template('template-home', () => {
        myDiv.innerHTML = "";

        const titreMain = nft.createElement('h2','Page Home',{},myDiv);
        myDiv.append(titreMain);
        nft.initData();
        return myDiv;
    });

    template('template-Fav', () => {
        myDiv.innerHTML = "";

        const titreMain = nft.createElement('h2','Ma Page Favoris', {},myDiv);

        let myNFTListFav = JSON.parse(localStorage.getItem('listFav'));
        const divListAttribut = {
            'style':'display: grid;' +
                'width: 80%;' +
                'margin: 0 auto;' +
                'grid-template-columns: repeat(3, 1fr);' +
                'gap: 50px;'
        }
        const myList = nft.createElement('div','',divListAttribut,nft.body)
        let displayList = []
        myNFTListFav.forEach((el) => {
            fetch("https://awesome-nft-app.herokuapp.com/nft/"+el)
                .then(response => response.json())
                .then(tab => {
                    const idTab = tab['id'];
                    const imageAttribute = {
                        'id':'myImg',
                        'src':tab['image_url'],
                        'loading':'lazy'
                    }
                    const articleAttribute = {
                        'id':idTab,
                        'title':tab['name'],
                        'class':'card'
                    }
                    const likeAttribute = {
                        'class': 'fa-regular fa-heart like'
                    }
                    const detailsAttribute = {
                        'class': 'details'
                    }
                    const elemenArticle = nft.createElement('article','',articleAttribute,myList);
                    nft.createElement('i', '',likeAttribute,elemenArticle,"click",nft.addEvent);
                    nft.createElement('img','',imageAttribute,elemenArticle);

                    const detailsArticle = nft.createElement('div','',detailsAttribute,elemenArticle);
                    nft.createElement('p',tab['name'],{}, detailsArticle);

                })
        });

        return myDiv;
    });
    template('template-detail', () => {
        myDiv.innerHTML = "";

        const titreMain = nft.createElement('h2',`Détail de`, {},nft.body);
        myDiv.appendChild(titreMain);
        let myNFT = JSON.parse(localStorage.getItem('myNft'));

        const divListAttribut = {
            'style':'display: block;' +
                'width: 80%;' +
                'margin: 0 auto;'
        }
        const myList = nft.createElement('div','',{},myDiv)

        fetch("https://awesome-nft-app.herokuapp.com/nft/"+myNFT)
            .then(response => response.json())
            .then(tab => {
                document.querySelector('h2').textContent = `${document.querySelector('h2').textContent} ${tab['name']}`
                const listFav = localStorage.getItem('listFav') ? localStorage.getItem('listFav') : []
                const isFav = listFav.includes(tab['id'])

                const idTab = tab['id'];

                const divListDescAttribut = {
                    'style':'display: grid;' +
                        'width: 80%;' +
                        'margin: 0 auto;' +
                        'grid-template-columns: repeat(3, 1fr);' +
                        'gap: 50px;'
                }
                const imageAttribute = {
                    'id':'myImg',
                    'src':tab['image_url'],
                    'loading':'lazy'
                }
                const articleAttribute = {
                    'id':idTab,
                    'title':tab['name'],
                    'class':'card'
                }
                const likeAttribute = {
                    'class': `fa-regular fa-heart ${isFav ? 'like' : ''}`
                }
                const detailsAttribute = {
                    'class': 'details'
                }
                const elemenArticle = nft.createElement('article','',articleAttribute,myList);
                nft.createElement('i', '',likeAttribute,elemenArticle,"click",nft.addEvent);
                nft.createElement('img','',imageAttribute,elemenArticle);
                const elementDiv = nft.createElement('div','',divListDescAttribut,myDiv)

                const detailsArticle = nft.createElement('div','',detailsAttribute,elemenArticle);

                const sectionCollection = nft.createElement('section','',{},elementDiv);
                nft.createElement('h3','Collection',{},sectionCollection)

                const sectionCreator = nft.createElement('section','',{},elementDiv);
                nft.createElement('h3','Creator',{},sectionCollection);

                const sectionOwner = nft.createElement('section','',{},elementDiv);
                nft.createElement('h3','Owner',{},sectionCollection)
            });

        return myDiv;
    });

    template('template-Contact', () => {
        myDiv.innerHTML = "";
        
        // START CODE KEST - PAGE CONTACT

        const titreMain = nft.createElement("h2", "Page Contact", {}, myDiv);
        myDiv.appendChild(titreMain);

        // Création <div> information
        const divInfo = nft.createElement("div", "", {}, myDiv);
        divInfo.setAttribute("id", "div_information_contact");
        divInfo.setAttribute("style", "text-align: center; margin-bottom: 60px");
        myDiv.appendChild(divInfo);

        // Création <p> information
        const textInfo = nft.createElement("p", "Une envie ? Une question ? N'hésitez pas à nous contacter. Nous nous ferons un plaisir de vous apporter les informations dont vous avez besoin.", {}, myDiv);
        divInfo.appendChild(textInfo);

        // Création <div> principale
        const divPrincipale = nft.createElement("div", "", {}, myDiv);
        divPrincipale.setAttribute("id", "div_principale_contact");
        divPrincipale.setAttribute("style", "display: flex; background-color: lightblue");
        myDiv.appendChild(divPrincipale);

        // Création bloc "Adresse"
        const divBloc1 = nft.createElement("div", "", {}, myDiv);
        divBloc1.setAttribute("style", "flex: 1");
        divPrincipale.appendChild(divBloc1);

            const divBloc1Image = nft.createElement("div", "", {}, myDiv);
            divBloc1Image.setAttribute("style", "display: flex; justify-content: center; padding: 20px 0");
            divBloc1.appendChild(divBloc1Image);
                
                const imageBloc1 = nft.createElement("img", "", {}, myDiv);
                imageBloc1.setAttribute("src", "../images/maison.png");
                imageBloc1.setAttribute("style", "height: 120px");
                divBloc1Image.appendChild(imageBloc1);

            const divBloc1Titre = nft.createElement("div", "", {}, myDiv);
            divBloc1Titre.setAttribute("style", "padding: 5px 0");
            divBloc1.appendChild(divBloc1Titre);
                
                const titreBloc1 = nft.createElement("h3", "Adresse", {}, myDiv);
                titreBloc1.setAttribute("style", "text-align: center");
                divBloc1Titre.appendChild(titreBloc1);
            
            const divBloc1Lien = nft.createElement("div", "", {}, myDiv);
            divBloc1Lien.setAttribute("style", "padding: 5px 0");
            divBloc1.appendChild(divBloc1Lien);
    
                const lienBloc1 = nft.createElement("a", "", {}, myDiv);
                lienBloc1.setAttribute("href", "https://www.google.fr/maps/place/1+Rue+du+Dahomey,+75011+Paris/@48.8401596,2.2413396,11z/data=!4m5!3m4!1s0x47e6720946dc2483:0x671ffbe6bd19d971!8m2!3d48.8512725!4d2.3822408");
                lienBloc1.setAttribute("style", "text-align: center");
                divBloc1Lien.appendChild(lienBloc1);

                    const texteBloc1 = nft.createElement("p", "1 Rue du Dahomey, 75011 Paris", {}, myDiv);
                    lienBloc1.appendChild(texteBloc1);

        // Création bloc "Téléphone"
        const divBloc2 = nft.createElement("div", "", {}, myDiv);
        divBloc2.setAttribute("style", "flex: 1");
        divPrincipale.appendChild(divBloc2);

            const divBloc2Image = nft.createElement("div", "", {}, myDiv);
            divBloc2Image.setAttribute("style", "display: flex; justify-content: center; padding: 20px 0");
            divBloc2.appendChild(divBloc2Image);
                
                const imageBloc2 = nft.createElement("img", "", {}, myDiv);
                imageBloc2.setAttribute("src", "../images/phone.png");
                imageBloc2.setAttribute("style", "height: 120px");
                divBloc2Image.appendChild(imageBloc2);

            const divBloc2Titre = nft.createElement("div", "", {}, myDiv);
            divBloc2Titre.setAttribute("style", "padding: 5px 0");
            divBloc2.appendChild(divBloc2Titre);
                
                const titreBloc2 = nft.createElement("h3", "Téléphone", {}, myDiv);
                titreBloc2.setAttribute("style", "text-align: center");
                divBloc2Titre.appendChild(titreBloc2);
            
            const divBloc2Lien = nft.createElement("div", "", {}, myDiv);
            divBloc2Lien.setAttribute("style", "padding: 5px 0");
            divBloc2.appendChild(divBloc2Lien);
    
                const lienBloc2 = nft.createElement("a", "", {}, myDiv);
                lienBloc2.setAttribute("href", "tel:0493000000");
                lienBloc2.setAttribute("style", "text-align: center");
                divBloc2Lien.appendChild(lienBloc2);

                    const texteBloc2 = nft.createElement("p", "04 93 00 00 00", {}, myDiv);
                    lienBloc2.appendChild(texteBloc2);
        
        // Création bloc "Email"
        const divBloc3 = nft.createElement("div", "", {}, myDiv);
        divBloc3.setAttribute("style", "flex: 1");
        divPrincipale.appendChild(divBloc3);

            const divBloc3Image = nft.createElement("div", "", {}, myDiv);
            divBloc3Image.setAttribute("style", "display: flex; justify-content: center; padding: 20px 0");
            divBloc3.appendChild(divBloc3Image);
                
                const imageBloc3 = nft.createElement("img", "", {}, myDiv);
                imageBloc3.setAttribute("src", "../images/email.png");
                imageBloc3.setAttribute("style", "height: 120px");
                divBloc3Image.appendChild(imageBloc3);

            const divBloc3Titre = nft.createElement("div", "", {}, myDiv);
            divBloc3Titre.setAttribute("style", "padding: 5px 0");
            divBloc3.appendChild(divBloc3Titre);
                
                const titreBloc3 = nft.createElement("h3", "Email", {}, myDiv);
                titreBloc3.setAttribute("style", "text-align: center");
                divBloc3Titre.appendChild(titreBloc3);
            
            const divBloc3Lien = nft.createElement("div", "", {}, myDiv);
            divBloc3Lien.setAttribute("style", "padding: 5px 0");
            divBloc3.appendChild(divBloc3Lien);
    
                const lienBloc3 = nft.createElement("a", "", {}, myDiv);
                lienBloc3.setAttribute("href", "mailto:ecv@projet_lak.fr");
                lienBloc3.setAttribute("style", "text-align: center");
                divBloc3Lien.appendChild(lienBloc3);

                    const texteBloc3 = nft.createElement("p", "ecv@projet_lak.fr", {}, myDiv);
                    lienBloc3.appendChild(texteBloc3);
        
        // Création bloc "Horaires"
        const divBloc4 = nft.createElement("div", "", {}, myDiv);
        divBloc4.setAttribute("style", "flex: 1");
        divPrincipale.appendChild(divBloc4);

            const divBloc4Image = nft.createElement("div", "", {}, myDiv);
            divBloc4Image.setAttribute("style", "display: flex; justify-content: center; padding: 20px 0");
            divBloc4.appendChild(divBloc4Image);
                
                const imageBloc4 = nft.createElement("img", "", {}, myDiv);
                imageBloc4.setAttribute("src", "../images/horloge.png");
                imageBloc4.setAttribute("style", "height: 120px");
                divBloc4Image.appendChild(imageBloc4);

            const divBloc4Titre = nft.createElement("div", "", {}, myDiv);
            divBloc4Titre.setAttribute("style", "padding: 5px 0");
            divBloc4.appendChild(divBloc4Titre);
                
                const titreBloc4 = nft.createElement("h3", "Horaires", {}, myDiv);
                titreBloc4.setAttribute("style", "text-align: center");
                divBloc4Titre.appendChild(titreBloc4);
            
            const divBloc4Texte = nft.createElement("div", "", {}, myDiv);
            divBloc4Texte.setAttribute("style", "padding: 5px 0");
            divBloc4.appendChild(divBloc4Texte);

                const texteBloc4 = nft.createElement("p", "Lun - Ven : 8h - 19h", {}, myDiv);
                texteBloc4.setAttribute("style", "text-align: center");
                divBloc4Texte.appendChild(texteBloc4);
        
        // Responsive div principale
        function responsiveDivPrincipale () {
            let largeur = window.innerWidth;

            if (largeur < 800) {
                divPrincipale.style.flexDirection = "column";
            } else {
                divPrincipale.style.flexDirection = "row";
            }
        }

        window.onload = responsiveDivPrincipale;
        window.onresize = responsiveDivPrincipale;

        // END CODE KEST - PAGE CONTACT

        return myDiv;
    });

    // Define the mappings route->template.
    route('/', 'template-home');
    route('/Favoris', 'template-Fav');
    route('/Contact', 'template-Contact');
    route('/nft', 'template-detail');
});

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

