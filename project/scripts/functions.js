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

nft.createElement = (tag, text, attributes, parent = null, event = null, eventFunction = null) => {
    const root = document.querySelector('#app')
    const allAttributes = attributes || [];
    const element = document.createElement(tag);

    function addEvent(myTag, myEvent, myFunction) {
        myTag.addEventListener(myEvent, myFunction);
    }

    if(allAttributes) {
        Object.keys(allAttributes).forEach(attr => {
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
    if (event) {
        addEvent(element, event, eventFunction);
    } else {
        event = null;
        eventFunction = null;
    }
    return element;
}

nft.initData = () => {
    if(localStorage.length) {
        let myNFTList = JSON.parse(localStorage.getItem('listAll'));
        const divListAttribut = {
            'class':'layout'
        }
        const myList = nft.createElement('div','',divListAttribut,nft.body)
        nft.createListNft(myNFTList,myList)
    } else {
        nft.testApiToken();
    }
    // localStorage.removeItem('listFav');
}

nft.createListNft = (listNft,parent) => {
    listNft.forEach(tab => {
        const idTab = tab['id'];
        const listFav = localStorage.getItem('listFav') ? localStorage.getItem('listFav') : []
        const isFav = listFav.includes(tab['id'])
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
        // const linkAttribute = {
        //     'href': 'details'
        // }
        const elemenArticle = nft.createElement('article','',articleAttribute,parent,'click',nft.eventDetail);
        nft.createElement('i', '',likeAttribute,elemenArticle,"click",nft.addEvent);
        nft.createElement('img','',imageAttribute,elemenArticle);
        // nft.createElement('p',tab['name'],{},elemenArticle);

        const detailsArticle = nft.createElement('div','',detailsAttribute,elemenArticle);
        nft.createElement('p',tab['name'],{}, detailsArticle)
        // nft.createElement('a','en savoir plus',linkAttribute, detailsArticle)

    })
}

nft.search = () => {
    const input = document.querySelector("#searchBar input");
    const clearSearch = document.querySelector("#clearSearch");
    const card = document.querySelectorAll(".card");

    input.addEventListener('keyup', function() {

        const filter = input.value.toUpperCase();
        const nftName = document.querySelectorAll(".details p");

        nftName.forEach(element => {
            el = element.closest(".card");
            txtValue = element.textContent || element.innerText;

            if (txtValue.toUpperCase().includes(filter)) {
                el.style.display = "";
            } else {
                el.style.display = "none";
            }
        });

        clearSearch.addEventListener('click', function() {
            input.value = '';
            card.forEach(element => {
                element.style.display = "";
            })
        });

    })
}

nft.addEvent = (e) => {
    e.stopPropagation();
    const idLike = e.target.parentElement.id;


    let allListFav = localStorage.getItem('listFav');

    if (!e.target.classList.contains('like')) {
        e.target.classList.add('like');
        
        if (allListFav == null || allListFav.length == 0)
            allListFav = []
        else
            allListFav = JSON.parse(localStorage.getItem('listFav'))
        allListFav.push(idLike);
        let listFinal = [...new Set(allListFav)];
        localStorage.setItem('listFav', JSON.stringify(listFinal));
    }
    else {
        e.target.classList.remove('like');
        localStorage.removeItem('listFav');
    }
}

nft.eventDeleteFav = (event) => {
    event.stopPropagation();
    const idLike = event.target.parentElement.id;
    const allListFav = JSON.parse(localStorage.getItem('listFav'))

    allListFav[allListFav.indexOf(idLike)] = '';
    const listFinal = [...new Set(allListFav)];

    localStorage.setItem('listFav', JSON.stringify(listFinal));
    window.location.reload();
}

nft.eventDetail = (e) => {
    const idNft = e.target.parentElement.id;

    localStorage.setItem('myNft', JSON.stringify(idNft));

    let allListHist = localStorage.getItem('listHist');
    if (allListHist == null || allListHist.length == 0)
        allListHist = [];
    else
        allListHist = JSON.parse(localStorage.getItem('listHist'))
    allListHist.push(idNft);
    let listFinal = [...new Set(allListHist)];

    localStorage.setItem('listHist', JSON.stringify(listFinal));

    window.location.hash = `#/nft/detail/${idNft}`;
}

nft.eventClear = () => {

    localStorage.setItem('listHist','');
    window.location.reload();
}

nft.testApiToken = async () => {
    const olAttribute = {
        'class':'layout'
    }
    const myList = nft.createElement('ol','',olAttribute,nft.body);
    await fetch("https://awesome-nft-app.herokuapp.com/")
        .then(response => response.json())
        .then(result => {
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