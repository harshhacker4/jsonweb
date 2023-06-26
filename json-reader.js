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

      
      // Hide the buttons before capturing the HTML
      const buttons = document.querySelectorAll(".button");
      buttons.forEach(button => {
        button.style.display = "none";
      });

 // Capture the HTML elements and convert them into an image
html2canvas(document.querySelector(".hero")).then(canvas => {
  // Create a new fabric.js canvas
  const fabricCanvas = new fabric.Canvas(null, { width: canvas.width, height: canvas.height });

  // Load the custom background image
  const backgroundImageURL = "temp.png";
  fabric.Image.fromURL(backgroundImageURL, function(backgroundImage) {
    // Set the custom image as the background of the fabric canvas
    backgroundImage.set({ selectable: false });
    fabricCanvas.setBackgroundImage(backgroundImage, fabricCanvas.renderAll.bind(fabricCanvas));

    fabricCanvas.setDimensions({ width: backgroundImage.width, height: backgroundImage.height });
// Adjust the positioning and dimensions of the image

      // Create a rectangular object as the background for the text
      const rect = new fabric.Rect({
        left: 50, // Adjust the position as needed
        top: 180, // Adjust the position as needed
        width: 900, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        fill: "rgba(255, 255, 255, 0)" // Adjust the background color and opacity as needed
      });
      fabricCanvas.add(rect);

      // Create the text object
      const text = new fabric.Textbox(dataFromUrl1.quotes[randomQuote].quote, {
        left: rect.left + 40, // Adjust the position to add padding
        top: rect.top + 10, // Adjust the position to add padding
        width: rect.width - 20, // Adjust the width to accommodate padding
        height: rect.height - 20, // Adjust the height to accommodate padding
        fill: "#dd4052",
        fontSize: 49.8,
        fontFamily: "Agrandir Black",
        fontStyle: "normal",
        fontWeight: "bold",
        textAlign: "center",
        editable: false, // Disable editing
        lockMovementX: true, // Lock horizontal movement
        lockMovementY: true // Lock vertical movement
      });

      // Create the text object
      const text2 = new fabric.Textbox(dataFromUrl2[randomQuote].word, {
        left: rect.left + 40, // Adjust the position to add padding
        top: rect.top - 120, // Adjust the position to add padding
        width: rect.width - 20, // Adjust the width to accommodate padding
        height: rect.height - 20, // Adjust the height to accommodate padding
        fill: "#f17790",
        fontSize: 59.8,
        fontFamily: "Agrandir Black",
        fontStyle: "normal",
        fontWeight: "bold",
        textAlign: "center",
        editable: false, // Disable editing
        lockMovementX: true, // Lock horizontal movement
        lockMovementY: true // Lock vertical movement
      });

    fabricCanvas.add(text);
    fabricCanvas.add(text2);

    // Convert the fabric.js canvas to a new image
    fabricCanvas.toDataURL({ format: "png" });

    // Create a new image element with the edited image
    const editedImage = new Image();
    editedImage.src = fabricCanvas.toDataURL();

    // Append the edited image to the document or perform any desired action
    //document.body.appendChild(editedImage);
    //console.log(editedImage);

    
    // Create a new anchor element
    const downloadLink = document.getElementById("download");
    downloadLink.download = "motesharsh.png"; // Specify the filename for the downloaded image

    // Set the href of the download link to the image data URL
    downloadLink.href = editedImage.src;

  

  
            
        // Show the buttons again after capturing the HTML
        buttons.forEach(button => {
          button.style.display = "";
        });
  });



        
      });

      
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


    
  