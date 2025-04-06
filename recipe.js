const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    title : {
        type: String,
        required: true,
    },
    type : {
        type: String,
        required: true,
    },
    meal : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
    keyIngredient : {
        type: String,
        required: true,
    },
    subIngredient_1 : {
        type: String,
        required: true,
    },
    subIngredient_2 : {
        type: String,
        required: true,
    },
    otherIngredients : {
        type: String,
        required: true,
    },
    process : {
        type: String,
        required: true,
    },
    time : {
        type : String,
        required : true,
    },
    calorie : {
        type: Number,
        required: true,
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;