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
})