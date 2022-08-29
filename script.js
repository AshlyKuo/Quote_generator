const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes=[];

// show loader

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true ;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;    
}



function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');    
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;

    complete();
}

// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        // Catch Error Here
    }
}

// Tweet Quote

function tweetQuote(){
    const twitterURL =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
     window.open(twitterURL,'_blank');
}

newQuoteBtn.addEventListener('click',getQuotes);
twitterBtn.addEventListener('click',tweetQuote);

getQuotes();
// loading();







