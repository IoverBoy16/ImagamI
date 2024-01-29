const basePath = "Match Flick Images/"; // Base file path for the folders
let sameMovie = false; // Whether or not the characters are from the same movie
let streak = 0;
let topstreak = 0;

currentMovie = "";
movieOne = "";
movieTwo = "";
characterOne = "";
characterTwo = "";

// Basic Variables to be used accross several functions

const images = {
    "Lord of the Rings": ["Denethor.webp", "Gandalf.webp", "Gollum.webp", "Gimli.webp", "Sam.webp", "Eowyn.webp", "Aragorn.webp"],
    "Oppenheimer": ["Albert Einstein.webp", "Edward Teller.webp", "Leslie Groves.webp", "Lewis Strauss.webp", "Robert Oppenheimer.webp"],
    "Harry Potter": ["Harry Potter.jpg", "Snape.jpg", "Fleur Delacour.webp", "Alastor Moody.webp", "Sirius Black.webp", "Dobby.webp"],
    "Top Gun Maverick": ["Hammer.avif", "Bob.avif", "Rooster.avif", "Penny.avif", "Phoenix.avif", "Hondo.avif", "Iceman.avif", "Maverick.avif"],
    "Barbie": ["Allan.jpg", "Barbie.avif", "Ken.avif", "Ruth Handler.avif", "Gloria.webp"],
    "Titanic": ["Thomas Andrews.avif", "Caledon Hockley.avif", "Fabrizio.avif", "Jack Dawson.avif", "Rose DeWitt Bukater.avif", "Ruth DeWitt Bukater.avif"],
    "Indiana Jones": ["George McHale.avif", "Harold Oxley.avif", "Henry Walton Jones.avif", "Indiana Jones.avif", "Sallah El-Kahir.avif", "Short Round.avif"],
    "The Dark Knight": ["Alfred.avif", "Bruce Wayne.avif", "Bane.avif", "Harvey Dent.avif", "Jim Gordon.avif", "Lucius Fox.avif", "Joker.avif", "Rachel Dawes.avif"],
    "Star Wars": ["Anakin Skywalker.webp", "Chewbacca.jpg", "Greedo.webp", "Han Solo.webp", "Luke Skywalker.webp", "Princess Leia.webp", "Yoda.png"]
};
// File path for all the potential images that can be loaded

let imageOnePath = ""; // Two variables used to decide the image path of both random photos
let imageTwoPath = "";

function pickTwoCharacters() {
/*
This function first decides if the characters chosen should be from the same movie, (30% chance of occuring)
    If they are, it chooses 2 distinct images from a random movie folder

    Else, chooses 2 distinct movie folders and then selects a random image from both

    This script also handles all variable storing and updating
*/
    const movies = Object.keys(images);
    sameMovie = Math.random() < 0.3;
    if (sameMovie) { // Code to select 2 characters from the same folder, 30% chance of occuring
        currentMovie = movies[Math.floor(Math.random() * movies.length)];
        const movieCharacters = images[currentMovie];

        let indexOne = Math.floor(Math.random() * movieCharacters.length);
        let indexTwo = Math.floor(Math.random() * movieCharacters.length);
        while (indexOne === indexTwo) { // Ensures that the two characters chosen are not the same, changes if they are
            indexTwo = Math.floor(Math.random() * movieCharacters.length);
        }

        imageOnePath = basePath + currentMovie + "/" + movieCharacters[indexOne];
        imageTwoPath = basePath + currentMovie + "/" + movieCharacters[indexTwo]; // Sets the base path for both pictures
    } else {
        let movieOneIndex = Math.floor(Math.random() * movies.length); // Code to select 2 characters from 2 separate movies
        let movieTwoIndex = Math.floor(Math.random() * movies.length);
        while (movieOneIndex === movieTwoIndex) { // Ensures the two movies chosen arent the same
            movieTwoIndex = Math.floor(Math.random() * movies.length);
        }

        movieOne = movies[movieOneIndex];
        movieTwo = movies[movieTwoIndex];

        const movieCharactersOne = images[movieOne]; //Makes a list of all the files in the movie folders
        const movieCharactersTwo = images[movieTwo];

        const imageOne = movieCharactersOne[Math.floor(Math.random() * movieCharactersOne.length)]; // Chooses a random character from each movie folder
        const imageTwo = movieCharactersTwo[Math.floor(Math.random() * movieCharactersTwo.length)];

        imageOnePath = basePath + movieOne + "/" + imageOne;
        imageTwoPath = basePath + movieTwo + "/" + imageTwo; // Sets the base path for both pictures
    }
}

function characterOne() { // Used for simplicity
    return imageOnePath;
}
function characterTwo() {
    return imageTwoPath;
}

function displayRandomImage() { // Function called on load of the page and every click
    pickTwoCharacters(); // This function set imageOnePath and imageTwoPath

    // Now, set the src attributes of your image placeholders
    document.getElementById('characterOne').src = imageOnePath;
    document.getElementById('characterTwo').src = imageTwoPath;

        // Extract and display the file names without extensions
    let characterNames = imageOnePath.split('/').pop().split('.')[0] + " ------------------------------------------------------------ " + imageTwoPath.split('/').pop().split('.')[0]; // Extracts the file name without extension

    document.getElementById('characterNames').innerText = characterNames;
}

function isSameMovie(answer){
    if (answer === sameMovie){ // Adds +1 to the streak if answer is correct
        streak ++;
        if (streak > topstreak){ // Updates top streak if streak higher then top streak
            topstreak = streak;
        }
    }
    else{
        if (streak > 0){ // Different alert message for 0 streak lost and an actual streak lost
            alertMessage = "Streak Lost"
        }
        else{
            alertMessage = "Wrong Answer"
        }
        
        if (sameMovie){  // Different alert message for whether or not the characters from same movie, and says which movie the chatacters from
            alert(alertMessage + "! Both characters were from " + currentMovie + ".");
            }
        else{
            alert(alertMessage + "! " + imageOnePath.split('/').pop().split('.')[0] + " was from " + movieOne + " and " + imageTwoPath.split('/').pop().split('.')[0] + " was from " + movieTwo + ".");
            }
        streak = 0;
    }
    document.getElementById('streak').innerText = streak; // Update streak display
    document.getElementById('topstreak').innerText = topstreak; // Update topstreak display
    displayRandomImage();
}


