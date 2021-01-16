function makeURL(){
    var queryURL="https://www.themealdb.com/api/json/v1/1/";

    // var inputSearch = $("#input")
    // .val()
    // .trim();
    var inputSearch='random.php'
    return queryURL+inputSearch;
}

function updatePageMeal(themealdbDATA){
    
	
    $("#MainSearch").append('<div id="cardmodalmeal" class="w3-modal-content w3-animate-zoom w3-card-4" title="Close Modal" ><div>')
    //close button
    var closebutton='<span type="button" id="closebuttonmeal" class="w3-button w3-display-topright">×</span>';
    let cardmodal=$("#cardmodalmeal")
    cardmodal.append(closebutton);
    //Title
    cardmodal.append('<div id="MealTitle">'+ themealdbDATA.meals[0].strMeal + '<div>')
    //Thumbnail
    var imageURL= themealdbDATA.meals[0].strMealThumb +"/preview";
    var image = $('<img id="Meal Img">');
    image.attr('src',imageURL);
    console.log(imageURL)
    cardmodal.append(image);
    //Instruction
    var tempInstruction =themealdbDATA.meals[0].strInstructions;
    var instruction='';
    for(var i=0;i<tempInstruction.length;i++){
        instruction+=tempInstruction[i];
        if(tempInstruction[i] == '.'){
            instruction+='<br>'    
        }
    }

    cardmodal.append("<br> <p id='instruction_fonts'>Instruction: </p>"+ instruction)
    //Ingredients
    cardmodal.append("<br> <p id='ingredients_fonts'>Ingredients: </p>")
    for (var i=1; i<=20; i++){
        var tempIngredient = eval('themealdbDATA.meals[0].strIngredient' + i.toString());
        var tempMeasure = eval('themealdbDATA.meals[0].strMeasure' + i.toString());
        if ((tempIngredient !="") && (tempIngredient !="null")){
            cardmodal.append("<br>"+tempIngredient+': '+tempMeasure);
        }
        else{
            break;
        }
    }

    //Close button event
    $("#closebuttonmeal").on("click",function(event){
        $("#GetYourMeal").removeAttr("disabled")
        $("#AdvanceSearch").removeAttr("disabled")
        cardmodal.remove()
    })
    

}

$("#GetYourMeal").on("click",function(event){
    event.preventDefault();
    $(this).attr("disabled","disabled")
    $("#AdvanceSearch").attr("disabled","disabled")
    var queryURL=makeURL();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePageMeal);
});

