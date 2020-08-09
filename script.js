// Get quotes from API
async function getQuote() {
    //proxy to prevent CORS error
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
        data = await response.json();
        console.log(data);
    } catch (e) {
        getQuote();
        console.log("noquote", e);
    }
}

// Onload
getQuote();
