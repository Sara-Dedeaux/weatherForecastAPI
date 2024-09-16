
let myLongitude;
let myLatitude;


const findMe =  () => {
    const success = (position) => {
        console.log(position);
        status.textContent = "success";
        const { latitude, longitude } = position.coords;
        myLatitude=position.coords.latitude;
        myLongitude=position.coords.longitude;
        
        console.log(position.coords); 
        fetchPointsData(myLatitude, myLongitude);
        
    };
    const error = () => {
        
    };
    navigator.geolocation.getCurrentPosition(success, error);
    
};

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

        fetchGridpointsData(wfo,gridX,gridY)
    })


}


async function fetchGridpointsData(wfo,gridX,gridY){
    let gridpointsURL= `https://api.weather.gov/gridpoints/${wfo}/${gridX},${gridY}/forecast`
    console.log(gridpointsURL)

    await fetch(gridpointsURL)
    .then(response => response.json())
    .then(data=> {
        let number = data.properties.number;
        console.log(number)
        
    })
} 