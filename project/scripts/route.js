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
        const linkAttribute = {
            'title':'view3',
            'href':'#/view3'
        }
        const titreMain = nft.createElement('h2','Page Home',linkAttribute,myDiv);
        myDiv.append(titreMain);
        nft.initData();
        return myDiv;
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
});

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

