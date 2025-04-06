const mongoose = require("mongoose");
const recipeData = require("./data.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/openKitchen";
const Recipe = require("../models/recipe.js");

//Connection to Database
main()
    .then((res) => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log("Connection wasnot successful", err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const reciDb = async() => {
    await Recipe.deleteMany( {} );
    await Recipe.insertMany( recipeData.data );
    console.log("Data was saved");
};

reciDb(); 