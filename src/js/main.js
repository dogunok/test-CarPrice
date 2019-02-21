const template = document.querySelector('.templateObjact');
const addTop = document.querySelector('.addToTop');
const addBottom = document.querySelector('.addToBottom');
const removeFirst = document.querySelector('.removeFirst');
const removeLast = document.querySelector('.removeLast')
const main = document.querySelector('.main');
const list = document.querySelector('.list');
const cart = document.querySelector('.cart');
const submitBtn = document.querySelector('.submitBtn');

// const getFile = (resolve, reject)=>{
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://localhost:3000/data');
//     xhr.send();
//     if(xhr.status !== 200){
//         resolve(console.error());
        
//     } else{
//         reject(JSON.parse(xhr.response));
//     }
    
// }
let promise = new Promise((res, rej) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/data', false);
    xhr.send();
    if(xhr.status !== 200){
        rej(console.error());
        
    } else{
        res(JSON.parse(xhr.response));
    }

})


const quantityElem = (elem, tag, clone) => {
    elem.forEach(item=>{
        let newTag = document.createElement(tag);
        newTag.textContent = item
            clone.querySelector('ul').appendChild(newTag)
    })
}

const render = data => {
    data.forEach((item, i) => {
        const templateClone = template.content.cloneNode(true)
        templateClone.querySelector('h4').textContent = item.title;
        quantityElem(item.attributes, 'li', templateClone);
        templateClone.querySelector('p').textContent = item.description;
        templateClone.querySelector('.serialNumber').textContent = i + 1;
        main.appendChild(templateClone)
    });
}
promise.then(render)

const changeNumber = elem => {
    const serialNumber = document.querySelectorAll('.serialNumber');
    Array.prototype.slice.call(elem).forEach((item, i) => {  
        serialNumber[i].textContent = i + 1
    })
}

addBottom.addEventListener('click', ()=>{
   let block = document.querySelectorAll('.block');
   let newBlock =  block[0].cloneNode(true);
   main.appendChild(newBlock);
   block = document.querySelectorAll('.block')
   changeNumber(block);
})

addTop.addEventListener('click', ()=>{
    let block = document.querySelectorAll('.block');
    let newBlock =  block[block.length - 1].cloneNode(true);
    main.insertBefore(newBlock, block[0]);
    block = document.querySelectorAll('.block')
    changeNumber(block);
 })

 removeFirst.addEventListener('click', ()=>{
    let block = document.querySelectorAll('.block');
    main.removeChild(block[0]);
    block = document.querySelectorAll('.block')
    changeNumber(block);
 })

 removeLast.addEventListener('click', ()=>{
    let block = document.querySelectorAll('.block');
    main.removeChild(block[block.length - 1]);
    block = document.querySelectorAll('.block')
    changeNumber(block);
 })

 list.addEventListener('click', ()=> {
     document.body.classList.add('sortList')
     document.body.classList.remove('sortBlock')
     list.classList.add('active')
     cart.classList.remove('active')
 })
 cart.addEventListener('click', ()=> {
    document.body.classList.remove('sortList')
    document.body.classList.add('sortBlock')
    cart.classList.add('active')
    list.classList.remove('active')
})

submitBtn.addEventListener('click', (evt) => {
    
    const addArticle = document.querySelector('#addArticle');
    const newTitle = document.querySelector('#newTitle');
    const describe = document.querySelector('#describe');
    const obj = [{
        "title" : newTitle.value,
        "attributes": [addArticle.value],
        "description": describe.value
    }]
        render(obj)
    const block = document.querySelectorAll('.block');
    changeNumber(block);
})