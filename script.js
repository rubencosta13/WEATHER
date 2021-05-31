const botao = document.getElementById('btn')
const weather = document.querySelectorAll('[enviar]')
const meteo = document.querySelectorAll('[meteo]')
const cidade = document.getElementById('cidade')
const things = document.getElementById('things')
const darkmode = document.getElementById('darkmode')
const map = document.getElementById('map').style.visibility = 'hidden'
const imperial = document.getElementById('imperial')
const metric = document.getElementById('metric')
languages = document.getElementById('languages').style.visibility = 'hidden'

function getlang(op) {
    var language_select = document.getElementById("languages");
    //var result = document.getElementById("selected-language");

    language_select.addEventListener('change', function (event) {
        var selected_value = this.value;
        //var selected_text = this.options[this.selectedIndex].text;
        //result.innerText = selected_value + '\n' + selected_text;
        let locale = selected_value
        fi(op, locale)
    });
}


async function fi(op) {
    let locale = 'en-us'
    let WEATHER_API_KEY = 'QyCpWNn8DToUOPS57lfjsnnGXgzI4MTQ'
    var city = document.getElementById('city').value
    city = city.toString().replace(/\s+/g,"+")
    const api_loc_id = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${WEATHER_API_KEY}&q=${city}&language=${locale}&details=false`
    const response = await fetch(api_loc_id)
    const data = await response.json()
    const forecast = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${data[0].Key}?apikey=${WEATHER_API_KEY}&language=${locale}&details=false&metric=true`
    const response1 = await fetch(forecast)
    const condition = await response1.json()
    const forecast2 = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${data[0].Key}?apikey=${WEATHER_API_KEY}&language=${locale}&details=false&metric=false`
    const response4 = await fetch(forecast2)
    const conditionI = await response4.json()
    const currentcondition = `http://dataservice.accuweather.com/currentconditions/v1/${data[0].Key}?apikey=${api}&language=${locale}&details=true`
    const response2 = await fetch(currentcondition)
    const data1 = await response2.json()
    if(data.wind === '' && data.temperature === ''){
        alert('Nao tem dados!')
        document.getElementById('things').style.visibility = 'hidden'
        return
    }
    if(op === 'i'){
        document.getElementById("location").innerText = 'Weather for: '+data[0].EnglishName
        document.getElementById("windimp").innerText = ''
        document.getElementById("maxtempimp").innerText = ''
        document.getElementById("mintempimp").innerText = ''
        document.getElementById("mintemp").innerText = `Minimum temperature: ${condition.DailyForecasts[0].Temperature.Minimum.Value}°${condition.DailyForecasts[0].Temperature.Maximum.Unit}` 
        document.getElementById("maxtemp").innerText = `Maximum temperature: ${condition.DailyForecasts[0].Temperature.Maximum.Value}°${condition.DailyForecasts[0].Temperature.Minimum.Unit}`
        document.getElementById("wind").innerText = `Wind speed: ${data1[0].Wind.Speed.Metric.Value} ${data1[0].Wind.Speed.Metric.Unit}`
        document.getElementById("desc").innerText = 'Description: '+data1[0].WeatherText
    }if(op === 'm'){
        document.getElementById("location").innerText = 'Weather for: '+data[0].EnglishName
        document.getElementById("mintemp").innerText = ''
        document.getElementById("maxtemp").innerText = ''
        document.getElementById("wind").innerText = ''
        document.getElementById("windimp").innerText = `Wind speed: ${data1[0].Wind.Speed.Imperial.Value} ${data1[0].Wind.Speed.Imperial.Unit}`
        document.getElementById("maxtempimp").innerText = `Maximum temperature: ${conditionI.DailyForecasts[0].Temperature.Maximum.Value}°${conditionI.DailyForecasts[0].Temperature.Maximum.Unit}`
        document.getElementById("mintempimp").innerText = `Minimum temperature: ${conditionI.DailyForecasts[0].Temperature.Minimum.Value}°${conditionI.DailyForecasts[0].Temperature.Minimum.Unit}`
        document.getElementById("desc").innerText = 'Description: '+data1[0].WeatherText
    }
}

imperial.addEventListener('click', imperial =>{
    fi('i')
})
metric.addEventListener('click', metric =>{
    fi('m')
})
getlang()