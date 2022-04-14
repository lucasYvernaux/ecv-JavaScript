const nft = {}

nft.clearString = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g,'');
}

nft.prop_access = (obj, path = null) => {
    if(path){
        path = path.split('.')
        for (let i=0; i<path.length; i++){
            obj = obj[path[i]];
        }
    }
    return JSON.stringify(obj);
};

nft.createElement = (tag, text, attributes, parent = null) => {
    const root = document.querySelector('body')
    const allAttributes = attributes || [];
    const element = document.createElement(tag);

    if(allAttributes) {
        Object.keys(allAttributes).forEach(attr => {
            console.log(allAttributes[attr])
            element.setAttribute(attr,allAttributes[attr])
        })
    }
    if(text) {
        element.innerHTML = text;
    }
    if(!parent) {
        nft.body.appendChild(element);
    } else {
        parent.appendChild(element);
    }
    return element;
}

nft.initData = () => {
    if(localStorage.length) {
        let myNFTList = JSON.parse(localStorage.getItem('listAll'));
        console.log('j\'ai une session');
        console.log(myNFTList)
        const divListAttribut = {
            'style':'display: grid;' +
                'width: 75%;' +
                'margin: 0 auto;' +
                'grid-template-columns: repeat(3, 1fr);'
        }
        const myList = nft.createElement('div','',divListAttribut,nft.body)
        nft.createListNft(myNFTList,myList)
    } else {
        console.log('pas de session');
        nft.testApiToken();
    }
}

nft.createListNft = (listNft,parent) => {
    listNft.forEach(tab => {
        const idTab = nft.clearString('title_'+tab['name']);
        const imageAttribute = {
            'style':'display:block;' +
                'width:150px;' +
                'height:150px',
            'id':'myImg',
            'src':tab['image_url'],
            'loading':'lazy'
        }
        const articleAttribute = {
            'style':'height:230px',
            'id':idTab
        }
        const elemenArticle = nft.createElement('article','',articleAttribute,parent);
        nft.createElement('img','',imageAttribute,elemenArticle);
        nft.createElement('p',tab['name'],{},elemenArticle);
    })
}

nft.testApiToken = async () => {
    const olAttribute = {
        'style':'display: grid;' +
            'width: 75%;' +
            'margin: 0 auto;' +
            'grid-template-columns: repeat(3, 1fr);'
    }
    const myList = nft.createElement('ol','',olAttribute,nft.body);
    await fetch("https://awesome-nft-app.herokuapp.com/")
        .then(response => response.json())
        .then(result => {
            console.log('je suis dans le fertch');
            console.log(result['assets'])
            localStorage.setItem('listAll', JSON.stringify(result['assets']));
            const testStorage = JSON.parse(localStorage.getItem('listAll'))
            testStorage.forEach(tab =>{
                const idTab = nft.clearString('title_'+tab['name']);
                const imageAttribute = {
                    'style':'display:block;' +
                        'width:150px;' +
                        'height:150px',
                    'id':'myImg',
                    'src':tab['image_url'],
                    'loading':'lazy'
                }
                const liAttribute = {
                    'style':'height:230px',
                    'id':idTab
                }
                const elementLi = nft.createElement('li',tab['name'],liAttribute,myList);
                nft.createElement('img','',imageAttribute,elementLi)
            })
        })
}