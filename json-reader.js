  var url1 = "quotes.json";
  var url2 = "words-def.json";
  
  Promise.all([fetch(url1), fetch(url2)])
    .then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    })
    .then(function (data) {
      var dataFromUrl1 = data[0];
      var dataFromUrl2 = data[1];
      
      // Work with the loaded data from both 
      var randomQuote = Math.ceil(Math.random()*(dataFromUrl1.quotes.length-1))

      var QuotetoChange = document.getElementById("quote");
      var WordtoChange = document.getElementById("word");

      console.log(dataFromUrl1.quotes[randomQuote].quote);
      console.log(dataFromUrl2[randomQuote].word);

      QuotetoChange.innerHTML = dataFromUrl1.quotes[randomQuote].quote;
      WordtoChange.innerHTML = dataFromUrl2[randomQuote].word;

      
      WordtoChange.addEventListener("mouseover", function(event) {
        WordtoChange.textContent = dataFromUrl2[randomQuote].meaning;
      });

      WordtoChange.addEventListener("mouseout", function(event) {
        WordtoChange.textContent = dataFromUrl2[randomQuote].word;
      });

    })
    .catch(function (error) {
      // Handle any errors that occurred during the fetch
      console.log("Error:", error);
    });
  