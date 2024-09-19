
//ESTABLISH GLOBAL VARIABLES
let myLongitude;
let myLatitude;
let forecastArr=[];

//PROVIDED FUNCTION TO FIND LOCATION COORDINATES
const findMe =  () => {
    const success = (position) => {
        console.log(position);
        status.textContent = "success";
        const { latitude, longitude } = position.coords;
        myLatitude=position.coords.latitude;
        myLongitude=position.coords.longitude;
        
        console.log(position.coords); 
        //FETCH POINT DATA ASYNC FUNCTION USES PARAMETERS TO PASS INTO THE FUNCTION TO MAKE SURE DATA IS LOADED BEFORE RUNNING THE FUNCTION 
        fetchPointsData(myLatitude, myLongitude);
        
    };
    const error = () => {
        
    };
    navigator.geolocation.getCurrentPosition(success, error);
    
};
//FIND LOCATION IS CALLED TO BEGIN RUNNING CODE
findMe(); 



//PULL DATA FROM POINTS


async function fetchPointsData(latitude, longitude){
    console.log("testing call")
    let pointsURL= `https://api.weather.gov/points/${latitude},${longitude}`
    console.log(pointsURL)

    await fetch(pointsURL)
    .then(response => response.json())
    .then(data => {

        let wfo=data.properties.gridId; 
        console.log(wfo)
        let gridX=data.properties.gridX;
        console.log(gridX)
        let gridY=data.properties.gridY; 
        console.log(gridY)
        let city=data.properties.relativeLocation.properties.city;
        let state=data.properties.relativeLocation.properties.state

        // FETCH GRID POINTS DATA IS CALLED INSIDE THIS FUNCTION TO MAKE SURE DATA IS AVAILABLE BEFORE RUNNING 
        fetchGridpointsData(wfo,gridX,gridY)
    })


}

async function fetchGridpointsData(wfo,gridX,gridY){
    let gridpointsURL= `https://api.weather.gov/gridpoints/${wfo}/${gridX},${gridY}/forecast`
    console.log(gridpointsURL)

    await fetch(gridpointsURL)
    .then(response => response.json())
    .then(data=> {
        forecastArr=data.properties.periods; 

        let currentDay= document.getElementById("day")
        currentDay.innerHTML+= " " + forecastArr[0].temperature + "°F";

        let dayIMG=document.getElementById("dayIMG");
        dayIMG.src=forecastArr[0].icon;

    
        
        let dayForecast=document.getElementById("dayForecast") 
        dayForecast.innerHTML= forecastArr[0].shortForecast;

        let dayForecastDetail=document.getElementById("dayForecastDetail") 
        dayForecastDetail.innerHTML= forecastArr[0].detailedForecast;

        let currentNight= document.getElementById("night")
        currentNight.innerHTML+= " " + forecastArr[1].temperature + "°F";

        let nightIMG=document.getElementById("nightIMG");
        nightIMG.src=forecastArr[1].icon;

               
        let nightForecast=document.getElementById("nightForecast") 
        nightForecast.innerHTML= forecastArr[1].shortForecast;

        let nightForecastDetail=document.getElementById("nightForecastDetail") 
        nightForecastDetail.innerHTML= forecastArr[1].detailedForecast;

        

        for (let i = 2; i < forecastArr.length; i++) {
            const element = forecastArr[i];

            let dayName=document.createElement("h3");
            dayName.innerHTML=element.name; 
            
            let newIcon=document.createElement("img");
            newIcon.src=element.icon
            
            let currentTempPTag=document.createElement("p");
            currentTempPTag.innerHTML= element.temperature + "°F";
            
            let dayConditionsPTag=document.createElement("p");
            dayConditionsPTag.innerHTML=element.shortForecast; 

            let detailForecast= document.createElement("p");
            detailForecast.innerHTML=element.detailedForecast
    
            let addDiv=document.createElement("div");

            let addBreak =document.createElement("br");
          
            let day2Div=document.querySelector(".day2");
            let day3Div=document.querySelector(".day3");
            let day4Div=document.querySelector(".day4");
            let day5Div=document.querySelector(".day5");
            let day6Div=document.querySelector(".day6");
            let day7Div=document.querySelector(".day7");
            
            if(element.number==3 || element.number==4){
             day2Div.append(addDiv)
             day2Div.append(dayName)
             day2Div.append(newIcon)
             day2Div.append(currentTempPTag)
             day2Div.append(dayConditionsPTag)
             day2Div.append(detailForecast)
             day2Div.append(addBreak)
             day2Div.append(addBreak)

            }else if(element.number==5 || element.number==6){
                day3Div.append(addDiv)
                day3Div.append(dayName)
                day3Div.append(newIcon)
                day3Div.append(currentTempPTag)
                day3Div.append(dayConditionsPTag)
                day3Div.append(detailForecast)
                day3Div.append(addBreak)
                day3Div.append(addBreak)
            }else if(element.number==7 || element.number==8){
                day4Div.append(addDiv)
                day4Div.append(dayName)
                day4Div.append(newIcon)
                day4Div.append(currentTempPTag)
                day4Div.append(dayConditionsPTag)
                day4Div.append(detailForecast)
                day4Div.append(addBreak)
                day4Div.append(addBreak)

            }else if(element.number==9 || element.number==10){
                day5Div.append(addDiv)
                day5Div.append(dayName)
                day5Div.append(newIcon)
                day5Div.append(currentTempPTag)
                day5Div.append(dayConditionsPTag)
                day5Div.append(detailForecast)
                day5Div.append(addBreak)
                day5Div.append(addBreak)

            }else if(element.number==11 || element.number==12){
                day6Div.append(addDiv)
                day6Div.append(dayName)
                day6Div.append(newIcon)
                day6Div.append(currentTempPTag)
                day6Div.append(dayConditionsPTag)
                day6Div.append(detailForecast)
                day6Div.append(addBreak)
                day6Div.append(addBreak)

            }else if(element.number==13 || element.number==14){
                day7Div.append(addDiv)
                day7Div.append(dayName)
                day7Div.append(newIcon)
                day7Div.append(currentTempPTag)
                day7Div.append(dayConditionsPTag)
                day7Div.append(detailForecast)
                day7Div.append(addBreak)
                day7Div.append(addBreak)

            }
        }
    
               
     
    })
} 