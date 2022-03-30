//variables globales


//eventos

document.addEventListener('DOMContentLoaded', ()=>{ 
   



});

//funciones
function fetchData() { 
  fetch('https://my-json-server.typicode.com/lupich/api/quote' ) 
  .then( response=> response.json() )
  .then( data => renderQuotes(data) )
 }


 function renderQuotes(data) {
    for (const q of data) {
//Find the container where we attach everything to
    const quoteUL = document.querySelector('#quote-list');
//Create all necessary elements
    const quoteLi = document.createElement('li');
    const blockQuote = document.createElement('blockquote');
    const p = document.createElement('p');
    const footer = document.createElement('footer');
    const br = document.createElement('br');
    const hr = document.createElement('hr')
//Add appropriate classes and ids. Grab data and insert if needed.
    quoteLi.className = 'quote-card';          //for styling
    blockQuote.className = 'blockquote';       //for styling
    p.className = 'mb-0';                      //for styling
    footer.className = 'blockquote-footer';    //for styling
    quoteLi.dataset.id = q.id
//Grab data and insert it into created elements
    p.innerHTML = q.quote;
    footer.innerHTML = q.autor;
//Append everything to main container
    blockQuote.append(p, footer, br, hr);
    quoteLi.append(blockQuote);
    quoteUL.append(quoteLi);
    

    //Create the dislikes button
    const dislikesBtn = document.createElement('button');
    quoteLi.className = 'quote-card';
    blockQuote.className = 'blockquote';
    p.className = 'mb-0';
    footer.className = 'blockquote-footer';
    quoteLi.dataset.id = q.id
    p.innerHTML = q.quote;
    footer.innerHTML = q.autor;
//Attach dislikes button to quote
    blockQuote.append(p, footer, br, dislikesBtn, hr);
    quoteLi.append(blockQuote);
    quoteUL.append(quoteLi);
//Attach all the necessary attributes to delete button
    dislikesBtn.innerHTML = 'Delete';
    dislikesBtn.className = 'btn-danger';  //for styling
    dislikesBtn.addEventListener('click', () => deleteQuote())

    function deleteQuote(){
        const url = `https://my-json-server.typicode.com/lupich/api/quote/${q.id}`;
        const reqObj = { method: 'DELETE' };
        fetch(url, reqObj)
        .then( quoteLi.remove() )
    }
    

    }
 }
//Call the function that will automatically run renderQuote() also 
 fetchData();

 const form = document.querySelector('#new-quote-form');
 form.addEventListener('submit', (e)=>postQuote(e))
    function postQuote(e) {
        e.preventDefault();
        const newQuote = document.querySelector('#new-quote').value;
        const newAuthor = document.querySelector('#author').value;
        const url = 'https://my-json-server.typicode.com/lupich/api/quote/';
        const reqObj = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            quote: newQuote,
            autor: newAuthor
        })
        }
    fetch(url, reqObj)
    .then(resp => resp.json())
    .then(quote => renderQuotes([quote]))

 }


