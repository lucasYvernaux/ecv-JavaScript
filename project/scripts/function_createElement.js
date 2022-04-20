nft.createElement = (tag, text, attributes, parent = null, event = null, eventFunction = null) => {
    const root = document.querySelector('#app')
    const allAttributes = attributes || [];
    const element = document.createElement(tag);

    function addEvent(myTag, myEvent, myFunction) {
        myTag.addEventListner(myEvent, myFunction);
    }    

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
    if (event) {
        addEvent(tag, event, eventFunction);
    } else {
        event = null;
        eventFunction = null;
    }
    return element;
}