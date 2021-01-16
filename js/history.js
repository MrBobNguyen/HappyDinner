var MealCount=parseInt(localStorage.getItem('MealCount'))
if (isNaN(MealCount)){
    MealCount=0;
}
var MovieCount=parseInt(localStorage.getItem('MovieCount'))
if (isNaN(MovieCount)){
    MovieCount=0;
}
MealCount=0;
MovieCount=0;


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
            History.append('<div class="row" id="HistoryRow"></div>');
            let HistoryRow=$("#HistoryRow");
            HistoryRow.append('<div class="col s6 center" id="historyMeal'+i+'"></div>')
            HistoryRow.append('<div class="col s6 center" id="historyMovie'+i+'"></div>')
            let MealTemp=localStorage.getItem("Meal"+i)
            if(MealCount>=i) {
                $("#historyMeal"+i).append("<a class='waves-effect waves-light btn-large' >"+ MealTemp  +"</a>")
            }
            let MovieTemp=localStorage.getItem("Movie"+i)
            if(MovieCount>=i){
                $("#historyMovie"+i).append("<a class='waves-effect waves-light btn-large' >"+ MovieTemp  +"</a>")
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
        console.log("click")
        $("#HistoryPlace").remove()
        $("#AdvanceSearch").removeAttr("disabled")
        $("#GetYourMeal").removeAttr("disabled")
        $("#GetYourMovie").removeAttr("disabled")
        $("#HistoryButton").removeAttr("disabled")
        $("#HistoryZone").append('<div class="row"  id="HistoryPlace"></div>')
    })
})