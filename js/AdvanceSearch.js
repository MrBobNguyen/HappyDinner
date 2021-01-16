function makeAdMealURL(){
    var queryURL="https://www.themealdb.com/api/json/v1/1/search.php?s=";

    var inputSearch = $("#AdMealInput")
     .val()
     .trim();
    return queryURL+inputSearch;
}
function makeAdomdbURL(){
    var queryURL="https://www.omdbapi.com/?apikey=e0f5e6bf&";

    var inputSearch = $("#AdMovieInput")
     .val()
     .trim();
    var realURL= queryURL+'t='+inputSearch;
    return realURL;
}






$("#AdvanceSearch").on("click",function(event){
    event.preventDefault();
    $("#AdvanceSearch").attr("disabled","disabled")
    $("#GetYourMeal").attr("disabled","disabled")
    $("#GetYourMovie").attr("disabled","disabled")
    $("#HistoryButton").attr("disabled","disabled")
    var Advance=$("#AdvanceCondition")
    Advance.append('<div class="row" id="AdMealSearchRow"></div>');

    var AdMealSearchRow=$("#AdMealSearchRow")
    AdMealSearchRow.append('<div class="input-field col s8" id="SearchInputMeal"></div>')
    $("#SearchInputMeal").append('<input id="AdMealInput" placeholder="What you want to eat" type="text" class="validate">')
    AdMealSearchRow.append('<div class="col s4 center" id="AdMealButton"></div>')
    $("#AdMealButton").append("<a class='waves-effect waves-light btn-large' id='AdGetYourMeal'><i class='material-icons right'>restaurant</i>Meal</a>")



    Advance.append('<div class="row" id="AdMovieSearchRow"></div>');

    var AdMovieSearchRow=$("#AdMovieSearchRow")
    AdMovieSearchRow.append('<div class="input-field col s8" id="SearchInputMovie"></div>')
    $("#SearchInputMovie").append('<input id="AdMovieInput" placeholder="What you want to watch" type="text" class="validate">')
    AdMovieSearchRow.append('<div class="col s4 center" id="AdMovieButton"></div>')
    $("#AdMovieButton").append("<a class='waves-effect waves-light btn-large' id='AdGetYourMovie'><i class='material-icons right'>local_movies</i>Movie</a>")


    //Advance Meal Page
    function updatePageAdMeal(themealdbDATA){
        
        
        $("#MainSearch").append('<div id="cardmodalmeal" class="w3-modal-content w3-animate-zoom w3-card-4" title="Close Modal" ><div>')
        
        if (themealdbDATA.meals!=null){
           //History save
            if(MealCount<5){
                MealCount+=1;
                localStorage.setItem("Meal"+MealCount,themealdbDATA.meals[0].strMeal);
                localStorage.setItem("IDMeal"+MealCount,themealdbDATA.meals[0].idMeal);
                localStorage.setItem("MealCount",MealCount)
            }else{
                for (let i=1;i<5;i++){
                    
                    let iTemp=i+1;
                    let tempIDMeal=localStorage.getItem("IDMeal"+iTemp)
                    let tempMeal=localStorage.getItem("Meal"+iTemp)
                    localStorage.setItem("Meal"+i,tempMeal);
                    localStorage.setItem("IDMeal"+i,tempIDMeal)
                }
                localStorage.setItem("Meal"+MealCount,themealdbDATA.meals[0].strMeal);
                localStorage.setItem("IDMeal5",themealdbDATA.meals[0].idMeal)
            }
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
                $("#AdGetYourMeal").removeAttr("disabled")
                AdSearchIsClicked=false;
                cardmodal.remove()
            })
        }else{
            $("#AdGetYourMeal").removeAttr("disabled")
        }
        
        
    
    }



    $("#AdGetYourMeal").on("click",function(event){
        event.preventDefault();
        $(this).attr("disabled","disabled")
       
        var queryURL=makeAdMealURL();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePageAdMeal);
    });



    //Advance Movie Page

    function updatePageADMovie(omdbDATA){
        //History movie
        if(MovieCount<5){
            MovieCount+=1;
            localStorage.setItem("Movie"+MovieCount,omdbDATA.Title)
            localStorage.setItem("IDMovie"+MovieCount,omdbDATA.imdbID);
            localStorage.setItem("MovieCount",MovieCount)
        }else{
            for (let i=1;i<5;i++){
                let iTemp=i+1;
                let tempIDMovie=localStorage.getItem("IDMovie"+iTemp)
                let tempMovieTitle=localStorage.getItem("Movie"+iTemp)
                localStorage.setItem("IDMovie"+i,tempIDMovie)
                localStorage.setItem("Movie"+i,tempMovieTitle)
            }
            localStorage.setItem("IDMovie5",omdbDATA.imdbID)
            localStorage.setItem("Movie"+MovieCount,omdbDATA.Title)
        }

        $("#MainSearch").append('<div id="cardmodalmovie" class="w3-modal-content w3-animate-zoom w3-card-4" title="Close Modal" ></div>')
        if (omdbDATA.Error!="Movie not found!"){
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
                $("#AdGetYourMovie").removeAttr("disabled")
                cardmodal.remove()
            })
        }else{
            $("#AdGetYourMovie").removeAttr("disabled")
        }
    
    }
    $("#AdGetYourMovie").on("click",function(event){
        event.preventDefault();
        $(this).attr("disabled","disabled")
        var queryURL=makeAdomdbURL();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePageADMovie);
    });



    //Advance Search Close button
    Advance.append('<div class="row" id="CloseRow"></div>');
    var CloseRow=$("#CloseRow")
    CloseRow.append('<div class="col s12 center" id="CloseAdvance"></div>')
    $("#CloseAdvance").append("<a class='waves-effect waves-light red btn-large' id='CloseAdvanceButton'><i class='material-icons right'>close</i>Close</a>")


    $("#CloseAdvanceButton").on("click",function(event){
        event.preventDefault();
        $("#AdvanceCondition").remove()
        $("#cardmodalmovie").remove()
        $("#cardmodalmeal").remove()
        $("#AdvanceSearch").removeAttr("disabled")
        $("#GetYourMeal").removeAttr("disabled")
        $("#GetYourMovie").removeAttr("disabled")
        $("#HistoryButton").removeAttr("disabled")
        $("#AdvanceZone").append('<div class="row"  id="AdvanceCondition"></div>')
    })
    
});










