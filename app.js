//Requiring Part
const port = 8080;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/openKitchen";
const Recipe = require("./models/recipe.js");
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const cors = require('cors');
const axios = require('axios');



//Setting Path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended : true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsMate);
app.use(cors());
app.use(express.json());



const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

//privacy policy
app.get("/home/recipe/privacy",(req,res)=>{
    res.render("includes/privacy.ejs");
    
    })
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

//Root page

app.get("/home", (req, res) => {
    res.render("./recipe/home.ejs");
});



// app.post('/generate-image', async (req, res) => {
//     const { prompt } = req.body;

//     try {
//         const response = await axios.post(
//             'https://api.openai.com/v1/images/generations',
//             {
//                 model: "dall-e-2",
//                 prompt: prompt,
//                 n: 1,
//                 size: "1024x1024"
//             },
//             {
//                 headers: {
//                     'Authorization': Bearer ${OPENAI_API_KEY},
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         res.json({ imageUrl: response.data.data[0].url });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


//recipe page

app.get("/home/recipe", async(req, res) => {
    const allRecipes = await Recipe.find({});
    res.render("./recipe/recipe.ejs", {allRecipes});
});


//Show route

app.get("/home/recipe/:id", async(req, res) => {
    let {id} = req.params;
    let recipe = await Recipe.findById(id);
    res.render("./recipe/show.ejs", {recipe});
});


//New recipe

app.post("/home/recipe/new", (req, res) => {
    res.render("./recipe/new.ejs");
});

//Adding the recipe

app.post("/home/recipe", async(req, res) => {
    const newRecipe = await new Recipe(req.body.recipe);
    newRecipe.save();
    res.redirect("/home/recipe");
});

//breakfast

app.get("/home/recipe/new/breakfast", async(req, res) => {
    const breakfast = await Recipe.find({ type:"Breakfast"});
    res.render("./recipe/breakfast.ejs", { breakfast });
});

//lunch

app.get("/home/recipe/new/lunch", async(req, res) => {
    const lunch = await Recipe.find({ type:"Lunch"});
    res.render("./recipe/lunch.ejs", {lunch});
});

//snacks

app.get("/home/recipe/new/snacks", async(req, res) => {
    const snacks = await Recipe.find({ type:"Snacks"});
    res.render("./recipe/snacks.ejs", {snacks});
});

//dinner

app.get("/home/recipe/new/dinner", async(req, res) => {
    const dinner = await Recipe.find({ type:"Dinner"});
    res.render("./recipe/dinner.ejs", {dinner});
});


//surpriseme

app.get("/home/recipe/new/surpriseme", async(req, res) => {
    try {
        const AllArray = await Recipe.find(); 

        if (AllArray.length === 0) {
           res.send("No recipes found!");
        }

        const randomIndex = Math.floor(Math.random() * AllArray.length);
        const randomRecipe = AllArray[randomIndex];

        res.render("./recipe/surprise.ejs", { randomRecipe });
    } catch (err) {
        console.error(err);
        res.send("Internal Server Error");
    }

});







//Server starting part

app.listen(port, (req, res) => {
    console.log("Server is listening to the port");
});