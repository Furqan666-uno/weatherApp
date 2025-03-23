const temperature= document.querySelector('.temp')
const state= document.querySelector('.state')
const dateTime= document.querySelector('.time-location p')
const condition= document.querySelector('.condition p')
const search= document.querySelector('.search-area')
const form= document.querySelector('form')

form.addEventListener('submit', searchForLocation)

let target= 'Mumbai'

let fetchResults= async (target) => {
    let url= `http://api.whetherapi.com/v1/current.json?key=417664c6d58487380c71034222609&q=${target}&api=no`
    const res= await fetch(url)
    const data= await res.json()
    console.log(data)

    //the api will give list of info about the location, we will store some of these info in variables 
    let locationName= data.location.name
    let time= data.location.localtime
    let temp= data.current.temp_c
    let conditions= data.current.condition.text

    updateDetails(locationName, time, temp, conditions)
}

function updateDetails(locationName, time, temp, conditions) {
    let splitDate= time.split(' ')[0] //split time infos into 2 divided by spaces b/w them and take the 0th element from them 
    let splitTime= time.split(' ')[1]
    let currDay= getDayName(new Date(splitDate).getDay())//getDay() will give week days in numbers, so we need to assign each number a day in another func 
    temperature.innerText= temp;
    state.innerText= locationName;
    dateTime.innerText= `${splitDate} ${currDay} ${splitTime}`;//will print result in this format 
    condition.innerText= conditions; 
}

function searchForLocation(event) {
    event.preventDefault()

    target= search.value
    fetchResults(target)
}

function getDayName(number) {
    if (number===0)
        return 'Sunday'
    if (number===1)
        return 'Monday'
    if (number===2)
        return 'Tuesday'
    if (number===3)
        return 'Wednesday'
    if (number===4)
        return 'Thursday'
    if (number===5)
        return 'Friday'
    if (number===6)
        return 'Saturday'
}