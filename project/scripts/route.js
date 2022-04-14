// Application div
const myDiv = document.getElementById("app"),
    routes = {},
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

// Register the templates.
    template('template-home', () => {
        myDiv.innerHTML = "";
        const linkAttribute = {
            'title':'view3',
            'href':'#/view3'
        }
        const titreMain = nft.createElement('h2','Page Home',linkAttribute,myDiv);
        myDiv.append(titreMain);
        const olAttribut = {
            'style':'display: grid;' +
                'width: 75%;' +
                'margin: 0 auto;' +
                'grid-template-columns: repeat(3, 1fr);'
        }
        const listNft = nft.createElement('ol','',olAttribut,myDiv);
        return myDiv.appendChild(listNft);
    });

    template('template-Fav', () => {
        myDiv.innerHTML = "";
        const linkAttribute = {
            'title':'view3',
            'href':'#/view3'
        },
        olAttribut = {
            'style':'display: grid;' +
                'width: 75%;' +
                'margin: 0 auto;' +
                'grid-template-columns: repeat(3, 1fr);'
        };
        const titreMain = nft.createElement('h2','Ma Page Favoris',linkAttribute,myDiv);
        myDiv.append(titreMain);

        const listFavNft = nft.createElement('ol','',olAttribut,myDiv);
        return myDiv.appendChild(listFavNft);
    });

    template('template-Contact', () => {
        myDiv.innerHTML = "";

        const titreMain = nft.createElement('h2','Page Contact',{},myDiv);

        return myDiv.appendChild(titreMain);
    });

// Define the mappings route->template.
route('/', 'template-home');
route('/Favoris', 'template-Fav');
route('/Contact', 'template-Contact');


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
};// For first load or when routes are changed in browser url box.
window.addEventListener('load', router);
window.addEventListener('hashchange', router);

