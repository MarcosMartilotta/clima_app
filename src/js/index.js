const API_KEY = '80e8648dcc224274a92c97db9a594508'


const openWeatherCall = async (URL_API) => {
    //const URL_API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${API_KEY}&units=metric`;
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
    const city = document.querySelector('#city').value;
    const URL_API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${API_KEY}&units=metric`;
    document.querySelector('#city').value = '';
    openWeatherCall(URL_API).then(data =>{
        /* debugger; */
        if (data.name){
            document.querySelector('.principaParams__city').innerHTML = data.name; 

        } else {
            document.querySelector('.principaParams__city').innerHTML = 'Ciudad inexistente';
        }
        document.querySelector('#description').innerHTML = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1);  
        document.querySelector('#temperature').innerHTML = `${Math.floor(data.main.temp)}°`;
        document.querySelector('#wind').innerHTML = `${data.wind.speed}k/h`;
        document.querySelector('#humidity').innerHTML = `${data.main.humidity}%`;
        document.querySelector('#visibility').innerHTML = `${data.visibility}m`;
        document.querySelector('#weatherIcon').src = `../../public/assets/icons/description_icons/${data.weather[0].icon}.png`
    });
}

 const getCurrentWeather = (URL_API) => {
    
     openWeatherCall(URL_API).then(data =>{

        document.querySelector('.principaParams__city').innerHTML = data.name;  
        document.querySelector('#description').innerHTML = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1);  
        document.querySelector('#temperature').innerHTML = `${Math.floor(data.main.temp)}°`;
        document.querySelector('#wind').innerHTML = `${data.wind.speed}k/h`;
        document.querySelector('#humidity').innerHTML = `${data.main.humidity}%`;
        document.querySelector('#visibility').innerHTML = `${data.visibility}m`;
        document.querySelector('#weatherIcon').src = `../../public/assets/icons/description_icons/${data.weather[0].icon}.png`
        console.log(document.querySelector('#weatherIcon').src);
    });
} 

window.onload = () => {
   
     if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            URL_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}&units=metric`;
                     http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${API_KEY}&units=metric
            getCurrentWeather(URL_API);

        })
    } else {
        document.querySelector('.principaParams__city').innerHTML = 'ClimaPp';
        document.querySelector('#description').innerHTML = 'Sunny';  
        document.querySelector('#temperature').innerHTML = `20°`;
        document.querySelector('#wind').innerHTML = `20k/h`;
        document.querySelector('#humidity').innerHTML = `45%`;
        document.querySelector('#visibility').innerHTML = `10000m`;
        document.querySelector('#weatherIcon').src = `../../public/assets/icons/description_icons/01d.png`;
        console.log(document.querySelector('#weatherIcon').src);
    } 

    document.querySelector('#search').addEventListener('click', getCity);
    document.querySelector('#city').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            getCity();
        }
    })


    const label = document.querySelector('label');
    label.addEventListener('click', ()=>{
        document.body.classList.toggle('dark');
        label.classList.toggle('active');
    })
    
}