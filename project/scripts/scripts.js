window.addEventListener('DOMContentLoaded', (event) => {

    const olAttribute = {
        'style':'display: grid;' +
            'width: 75%;' +
            'margin: 0 auto;' +
            'grid-template-columns: repeat(3, 1fr);'
    }
    const myList = nft.createElement('ol','',olAttribute,document.querySelector('#app'));

nft.body = document.querySelector('#app')
nft.initData();



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