function makeid(length) {
   var result           = '';
   var characters       = 'abcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}




function makeomdbURL(){
    var queryURL="https://www.omdbapi.com/?apikey=e0f5e6bf&";

    // var inputSearch = $("#input")
    // .val()
    // .trim();
    var randomYear=Math.floor(Math.random() * 5);
    var year=2020-randomYear
    var inputSearch="y="+year+"&t="+makeid(1);
    var realURL= queryURL+inputSearch;
    return realURL;
}

function updatePageMovie(omdbDATA){
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
        localStorage.setItem("Movie5",omdbDATA.imdbID)
        localStorage.setItem("Movie"+MovieCount,omdbDATA.Title)
    }

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
        $("#GetYourMovie").removeAttr("disabled")
        $("#AdvanceSearch").removeAttr("disabled")
        cardmodal.remove()
    })
    

}



$("#GetYourMovie").on("click",function(event){
    event.preventDefault();
    $(this).attr("disabled","disabled")
    $("#AdvanceSearch").attr("disabled","disabled")
    var queryURL=makeomdbURL();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(updatePageMovie);
});
