function makeMealSearchURL(x){
    var queryURL="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let IDMeal=localStorage.getItem("IDMeal"+x);
    return queryURL+IDMeal;
}

function makeomdbSearchURL(x){
    var queryURL="https://www.omdbapi.com/?apikey=e0f5e6bf&";
    var SearchID=localStorage.getItem("IDMovie"+x);
    var realURL= queryURL+"i="+SearchID;
    return realURL;
}


function updatePageHistoryMeal(themealdbDATA){
    $("#MainSearch").append('<div id="cardmodalmeal" class="w3-modal-content w3-animate-zoom w3-card-4" title="Close Modal" ><div>')
    //close button
    var closebutton='<span type="button" id="closebuttonmeal" class="w3-button w3-display-topright">×</span>';
    let cardmodal=$("#cardmodalmeal")
    cardmodal.append(closebutton);
    //Title
    cardmodal.append('<p><br></p>')
    cardmodal.append('<div id="MealTitle">'+ themealdbDATA.meals[0].strMeal + '<div>')
    //Thumbnail
    var imageURL= themealdbDATA.meals[0].strMealThumb +"/preview";
    var image = $('<img id="Meal Img">');
    image.attr('src',imageURL);
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
        $(".history-meal").removeAttr("disabled")
        cardmodal.remove()
    })
    

}


function updatePageHistoryMovie(omdbDATA){

    $("#MainSearch").append('<div id="cardmodalmovie" class="w3-modal-content w3-animate-zoom w3-card-4" title="Close Modal" ></div>')
    //close button
    var closebutton='<span type="button" id="closebuttonmovie" class="w3-button w3-display-topright">×</span>';
    let cardmodal=$("#cardmodalmovie")
    cardmodal.append(closebutton);
    //Title
    cardmodal.append('<br> <p id="MovieTitle" ">'+omdbDATA.Title+'</p>')
    //Thumbnail
    cardmodal.append(' <img src=" ' + omdbDATA.Poster + '"></img>');
    //Year
    cardmodal.append('<h4> Year: '+ omdbDATA.Year+'</h4>')
    //Rated
    cardmodal.append('<h4> Rated: '+ omdbDATA.Rated+'</h4')
    //Release
    cardmodal.append('<h4> Released: '+omdbDATA.Released+'</h4>')
    //Runetime
    cardmodal.append('<h4> Runtime: '+omdbDATA.Runtime+'</h4>')
    //Genre
    cardmodal.append('<h4> Genre: '+omdbDATA.Genre+'</h4>')
    //Country
    cardmodal.append('<h4> Country: '+omdbDATA.Country+'</h4>')
        

    //Close Button
    $("#closebuttonmovie").on("click",function(event){
        $(".history-movie").removeAttr("disabled")
        cardmodal.remove()
    })
    

}





var MealCount=parseInt(localStorage.getItem('MealCount'))
if (isNaN(MealCount)){
    MealCount=0;
}
var MovieCount=parseInt(localStorage.getItem('MovieCount'))
if (isNaN(MovieCount)){
    MovieCount=0;
}




$("#HistoryButton").on("click",function(event){
    event.preventDefault();
    $("#HistoryButton").attr("disabled","disabled")
    $("#AdvanceSearch").attr("disabled","disabled")
    $("#GetYourMeal").attr("disabled","disabled")
    $("#GetYourMovie").attr("disabled","disabled")
    var History=$("#HistoryPlace")




    

    //History Place
    for (let i=1;i<=5;i++){
        if((MealCount<i) && (MovieCount<i)){
            break;
        }else{
            History.append('<div class="row" id="HistoryRow'+i+ '"></div>');
            let HistoryRow=$("#HistoryRow"+i);
            HistoryRow.append('<div class="col s6 center" id="historyMeal'+i+'"></div>')
            HistoryRow.append('<div class="col s6 center" id="historyMovie'+i+'"></div>')
            let MealTemp=localStorage.getItem("Meal"+i)
            let IdMealTemp=localStorage.getItem("IDMeal"+i)
            if(MealCount>=i) {
                $("#historyMeal"+i).append("<a class='waves-effect waves-light btn-large history-meal' id='MealButton"+i+"' >"+ MealTemp  +"</a>")
                $("#MealButton"+i).on("click",function(){
                    event.preventDefault();
                    
                    $(".history-meal").attr("disabled","disabled")
                    let queryURL=makeMealSearchURL(i);
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(updatePageHistoryMeal);
                })
            }
            let MovieTemp=localStorage.getItem("Movie"+i)
            
            let IdMovie=localStorage.getItem("IDMovie"+i)
            if(MovieCount>=i){
                $("#historyMovie"+i).append("<a class='waves-effect waves-light btn-large history-movie' id='MovieButton"+i+"' >"+ MovieTemp  +"</a>")
                $("#MovieButton"+i).on("click",function(){
                    event.preventDefault();
                    
                    $(".history-movie").attr("disabled","disabled")
                    // console.log(localStorage.getItem("IDMovie1"))
                    // console.log(localStorage.getItem("IDMovie2"))
                    // console.log(localStorage.getItem("IDMovie3"))
                    // console.log(localStorage.getItem("IDMovie4"))
                    // console.log(localStorage.getItem("IDMovie5"))
                    
                    let queryURL=makeomdbSearchURL(i);
                    console.log(queryURL)
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(updatePageHistoryMovie);
                })
            }
            




        }
    }

    //History Close button
    History.append('<div class="row" id="CloseHistoryRow"></div>');
    var CloseHistoryRow=$("#CloseHistoryRow")
    CloseHistoryRow.append('<div class="col s12 center" id="CloseHistory"></div>')
    $("#CloseHistory").append("<a class='waves-effect waves-light red btn-large' id='CloseHistoryButton'><i class='material-icons right'>close</i>Close</a>")
    $("#CloseHistoryButton").on("click",function(event){
        event.preventDefault();
        $("#HistoryPlace").remove()
        $("#cardmodalmovie").remove()
        $("#cardmodalmeal").remove()
        $("#AdvanceSearch").removeAttr("disabled")
        $("#GetYourMeal").removeAttr("disabled")
        $("#GetYourMovie").removeAttr("disabled")
        $("#HistoryButton").removeAttr("disabled")
        $("#HistoryZone").append('<div class="row"  id="HistoryPlace"></div>')
    })
})