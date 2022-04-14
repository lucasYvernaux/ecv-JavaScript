window.addEventListener('DOMContentLoaded', (event) => {

    const olAttribute = {
        'style':'display: grid;' +
            'width: 75%;' +
            'margin: 0 auto;' +
            'grid-template-columns: repeat(3, 1fr);'
    }
    const myList = nft.createElement('ol','',olAttribute);
    if(localStorage.length) {
        let myNFTList = JSON.parse(localStorage.getItem('listAll'));
        console.log('j\'ai une session');
        console.log(myNFTList)
        myNFTList.forEach(tab => {
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
    } else {
        console.log('pas de session');
        nft.testApiToken();
    }

    async function requestAPi() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${m3oToken}`);

        const formdata = new FormData();
        formdata.append("contract_address", "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb");
        formdata.append("token_id", "1");

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch('https://awesome-nft-app.herokuapp.com/')
            .then(response => response.json())
            .then(result => {
                return result;
            })
    }
});