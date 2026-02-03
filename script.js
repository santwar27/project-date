// This variable will store the food we clicked
let chosenFood = "";

function pickFood(food) {
    chosenFood = food;
    
    // Open Google Maps in a new tab to help find a place
    // I hope the URL format is right!
    window.open("https://www.google.com/maps/search/" + food + " restaurant UK", "_blank");

    // Show the hidden form
    document.getElementById("date-form").style.display = "block";
}

function saveDate() {
    const restaurant = document.getElementById("restaurantName").value;
    const date = document.getElementById("datePicker").value;

    if (restaurant === "" || date === "") {
        alert("Please fill everything out! I don't want to miss our date!");
        return;
    }

    // Creating the object to send to the server
    const dateData = {
        food: chosenFood,
        where: restaurant,
        when: date
    };

    // Sending the data to my Node server!
    // I used 'fetch'... it was a bit confusing but I think I got it.
   fetch('/save-date', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dateData)
    })
    .then(response => {
        console.log("Server responded!");
        // Hide the form and show the cute message
        document.getElementById("date-form").style.display = "none";
        document.getElementById("finalMessage").style.display = "block";
    })
    .catch(err => {
        console.log("Oops, error! But I'll show the message anyway because I'm optimistic.");
        document.getElementById("date-form").style.display = "none";
        document.getElementById("finalMessage").style.display = "block";
    });
}