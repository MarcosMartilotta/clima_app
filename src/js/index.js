
const API_KEY = '80e8648dcc224274a92c97db9a594508';

const URL_API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${API_KEY}&units=metric`;

async function  openWeatherCall () {
    const res = await fetch(URL_API);
    console.log(res); 
    const data = await res.json();
    console.log(data)
    debugger;

    if (res.status !== 200) {
            console.error(`No se pudo realizar el llamado, error : ${res.status}`)
        } else {
            console.log('Se realizó el llamado correctamente')
        }
}

