const botao = document.getElementById("btn"),
    weather = document.querySelectorAll("[enviar]"),
    meteo = document.querySelectorAll("[meteo]"),
    cidade = document.getElementById("cidade"),
    things = document.getElementById("things"),
    darkmode = document.getElementById("darkmode"),
    map = (document.getElementById("views").style.visibility = "hidden"),
    imperial = document.getElementById("imperial"),
    metric = document.getElementById("metric");



async function fi(e) {
    let t = "QyCpWNn8DToUOPS57lfjsnnGXgzI4MTQ";
    let n = document.getElementById("city").value;
    const i = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${t}&q=${(n = n.toString().replace(/\s+/g, "+"))}&language=en-us&details=false`,
        m = await fetch(i),
        a = await m.json(),
        d = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${a[0].Key}?apikey=${t}&language=en-us&details=true&metric=true`,
        r = await fetch(d),
        c = await r.json(),
        l = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${a[0].Key}?apikey=${t}&language=en-us&details=false&metric=false`,
        u = await fetch(l),
        o = await u.json(),
        s = `http://dataservice.accuweather.com/currentconditions/v1/${a[0].Key}?apikey=${t}&language=en-us&details=true`,
        y = await fetch(s),
        p = await y.json();
    if ("" === a.wind && "" === a.temperature) return alert("Nao tem dados!"), void (document.getElementById("things").style.visibility = "hidden");
    "i" === e &&
        ((document.getElementById("location").innerText = "Weather for: " + a[0].EnglishName),
        (document.getElementById("windimp").innerText = ""),
        (document.getElementById("maxtempimp").innerText = ""),
        (document.getElementById("mintempimp").innerText = ""),
        (document.getElementById("mintemp").innerText = `Minimum temperature: ${c.DailyForecasts[0].Temperature.Minimum.Value}°${c.DailyForecasts[0].Temperature.Maximum.Unit}`),
        (document.getElementById("maxtemp").innerText = `Maximum temperature: ${c.DailyForecasts[0].Temperature.Maximum.Value}°${c.DailyForecasts[0].Temperature.Minimum.Unit}`),
        (document.getElementById("wind").innerText = `Wind speed: ${p[0].Wind.Speed.Metric.Value} ${p[0].Wind.Speed.Metric.Unit}`),
        (document.getElementById("desc").innerText = "Description: " + p[0].WeatherText)),
        "m" === e &&
            ((document.getElementById("location").innerText = "Weather for: " + a[0].EnglishName),
            (document.getElementById("mintemp").innerText = ""),
            (document.getElementById("maxtemp").innerText = ""),
            (document.getElementById("wind").innerText = ""),
            (document.getElementById("windimp").innerText = `Wind speed: ${p[0].Wind.Speed.Imperial.Value} ${p[0].Wind.Speed.Imperial.Unit}`),
            (document.getElementById("maxtempimp").innerText = `Maximum temperature: ${o.DailyForecasts[0].Temperature.Maximum.Value}°${o.DailyForecasts[0].Temperature.Maximum.Unit}`),
            (document.getElementById("mintempimp").innerText = `Minimum temperature: ${o.DailyForecasts[0].Temperature.Minimum.Value}°${o.DailyForecasts[0].Temperature.Minimum.Unit}`),
            (document.getElementById("desc").innerText = "Description: " + p[0].WeatherText));
}
imperial.addEventListener("click", (e) => {
    fi("i");
}),
metric.addEventListener("click", (e) => {
    fi("m");
});
