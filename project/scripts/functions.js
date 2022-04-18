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
    const root = document.querySelector('#app')
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
                'width: 80%;' +
                'margin: 0 auto;' +
                'grid-template-columns: repeat(3, 1fr);' +
                'gap: 50px;'
        }
        const myList = nft.createElement('div','',divListAttribut,nft.body)
        nft.createListNft(myNFTList,myList)
    } else {
        console.log('pas de session');
        nft.testApiToken();
    }
    // localStorage.removeItem('listFav');
}

nft.createListNft = (listNft,parent) => {
    listNft.forEach(tab => {
        const idTab = nft.clearString('title_'+tab['name']);
        const imageAttribute = {
            'id':'myImg',
            'src':tab['image_url'],
            'loading':'lazy'
        }
        const articleAttribute = {
            'id':idTab,
            'class':'card'
        }
        const likeAttribute = {
            'class': 'fa-regular fa-heart'
        }
        const detailsAttribute = {
            'class': 'details'
        }
        // const linkAttribute = {
        //     'href': 'details'
        // }
        const elemenArticle = nft.createElement('article','',articleAttribute,parent);
        nft.createElement('i', '',likeAttribute,elemenArticle);
        nft.createElement('img','',imageAttribute,elemenArticle);
        // nft.createElement('p',tab['name'],{},elemenArticle);

        const detailsArticle = nft.createElement('div','',detailsAttribute,elemenArticle);
        nft.createElement('p',tab['name'],{}, detailsArticle)
        // nft.createElement('a','en savoir plus',linkAttribute, detailsArticle)

    })
}

nft.addFav = () => {
    const like = document.querySelectorAll('.card i');
    const listFav = [];

    const allListFav = JSON.parse(localStorage.getItem('listFav')) ?  JSON.parse(localStorage.getItem('listFav'))  : [];

    
    like.forEach(element => {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            const idLike = element.parentElement.id;

            if (!this.classList.contains('like')) {
                this.classList.add('like');
                
                console.log(allListFav);
                allListFav.push(idLike);
                localStorage.setItem('listFav', JSON.stringify(allListFav));


                console.log("Add", element.parentElement.id);
            }
            else {
                this.classList.remove('like');
                localStorage.removeItem('listFav', JSON.stringify(allListFav));
                console.log("Remove", element.parentElement.id);
            }

        })
    });
}

nft.testApiToken = async () => {
    const olAttribute = {
        'style':'display: grid;' +
            'width: 80%;' +
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
            const testStorage = JSON.parse(localStorage.getItem('listAll'));
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