const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Get quotes from API
async function getQuote() {
    //proxy to prevent CORS error
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        data = await response.json();

        //get the contents because of proxy API
        dataJSON = JSON.parse(data.contents);

        //if the author name is unavailable
        if (dataJSON.quoteAuthor === "") {
            quoteAuthor.innerText = "Unknown";
        } else {
            quoteAuthor.innerText = dataJSON.quoteAuthor;
        }

        //Reduce size for longer text
        if (dataJSON.quoteText.length > 50) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = dataJSON.quoteText;
    } catch (e) {
        getQuote();
        console.log("noquote", e);
    }
}

const tweetQuote = () => {
    const quote = dataJSON.quoteText;
    const author = dataJSON.quoteAuthor;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
};

//Event listener
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Onload
getQuote();
