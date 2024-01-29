// Initializes base variables
const basePath = "Continent Streak Images/";
let currentContinent = "";
let streak = 0;
let topstreak = 0;
let movieName = "";

// Images for each continent, must be loaded ahead of time due to 
const images = {
    "Africa": ["Congo.jpg", "Mad Max - Fury Road.jpg", "Beasts of No Nation.jpg", "Blood Diamond.jpg", "Last King of Scotland.webp"],
    "Antarctica": ["South of Sanity.png"],
    "Asia": ["Dune.webp", "Crazy Rich Asians.jpg", "City of Ghosts.jpg", "The Darjeeling Limited.jpg"],
    "Australia": ["Lord of the Rings.webp", "Whale Rider.jpg", "Walkabout.jpg"],
    "Europe": ["Paddington.webp", "The Sound of Music.jpg", "Pride and Prejudice.png", "Funny Face.png", "Ratatouille.jpg"],
    "North America": ["The Revenant.jpg", "The Norseman.webp", "Titanic.jpg"],
    "South America": ["City of God.jpg", "No.jpg"]
};

function getRandomImage() { // chooses a random folder from the list in the images -> Chooses a random image from folder
    const continents = Object.keys(images); // Creates a list of all the possible continents to choose from
    let randomContinent = continents[Math.floor(Math.random() * continents.length)]; // Chooses a random continent
    while (randomContinent === currentContinent){ // Chooses a random continent until different from previous
        randomContinent = continents[Math.floor(Math.random() * continents.length)]; // Chooses a random continent
    }
    currentContinent = randomContinent //

    const continentImages = images[randomContinent]; // Selects the images from the selected folder
    const randomImage = continentImages[Math.floor(Math.random() * continentImages.length)]; // Chooses a random image
    document.getElementById('movieName').innerText = randomImage.replace(/\.[^/.]+$/, "");; // Displays the name of the movie

    return basePath + randomContinent + "/" + randomImage;

}

function checkContinent(selectedContinent){
    if (currentContinent === selectedContinent){
        streak++; // Increment the score of the game by 1
        if (streak > topstreak){
            topstreak = streak
        }
    }
    else {
        if (streak > 0){
            alert("Streak Lost! The answer was: " + currentContinent);
        }
        streak = 0; // Resets the streak when the wrong continent is guessed
    }
    document.getElementById('streak').innerText = streak; // Update streak display
    document.getElementById('topstreak').innerText = topstreak; // Update topstreak display
    displayRandomImage(); // Display a new random image
}

function displayRandomImage() {
    const imagePath = getRandomImage();
    document.getElementById('randomImage').src = imagePath;
}

// Function to update the streak display
function updateStreakDisplay() {
    document.getElementById('streak').innerText = streak;
}