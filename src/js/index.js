

const openWeatherCall = async (city, API_KEY) => {
    const URL_API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${API_KEY}&units=metric`;
    const res = await fetch(URL_API);
    const data = await res.json();
    /* console.log(data); */
    /* debugger; */
    if (res.status !== 200) {
        console.error(`No se pudo realizar el llamado, error : ${res.status}`);
    } else {
        console.log('Se realizó el llamado correctamente');
    }
    return data;
}

//tomo el input de la ciudad
const getCity = () => {
    const API_KEY = '80e8648dcc224274a92c97db9a594508';
    const city = document.querySelector('#city').value;
    document.querySelector('.principaParams__city').innerHTML = city;   
    openWeatherCall(city, API_KEY).then(data =>{
        /* debugger; */
        document.querySelector('#description').innerHTML = data.weather[0].description;  
        document.querySelector('#temperature').innerHTML = `${Math.floor(data.main.temp)}°`;
        document.querySelector('#wind').innerHTML = `${data.wind.speed}k/h`;
        document.querySelector('#humidity').innerHTML = `${data.main.humidity}%`;
        document.querySelector('#visibility').innerHTML = `${data.visibility}m`;
    });
}


window.onload = () => {
   

    document.querySelector('#search').addEventListener('click', getCity);
}