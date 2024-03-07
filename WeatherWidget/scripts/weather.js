const clouds = document.querySelector('.clouds-procent');
const temp = document.querySelector('.weather__temp');
const temp_feels = document.querySelector('.weather__temp_feels');

const wind = document.querySelector('.wind-speed');
const atmosphere = document.querySelector('.weather__atmosphere');
const query_data = document.querySelector('.weather__search-field');
const search_btn = document.querySelector('.weather__search-btn')

const token = '0aa05978fdff569bc7aacf2d8fb5f609';

search_btn.addEventListener('click', async (e)=> {
	let city, country;

	if (!validateSearch()) {query_data.value = ''; return NaN;}

	try {
		query = query_data.value.split(',');
		city = query[0].trim();
		country = query[1].trim();

	} catch {
		city = query_data.value.trim();
		country = NaN;
	}

	let language = navigator.language || navigator.userLanguage;

	data = await get_data(token, city, country, language)

	if (!data) {
		alert('Неудалось обработать запрос, проверьте город на наличие ошибок!');
		return;
	}

	temp.innerHTML = data['main']['temp'];
	temp_feels.innerHTML = data['main']['feels_like'];
	clouds.innerHTML = data['clouds']['all'];
	atmosphere.innerHTML = data['weather'][0]['description'];
	wind.innerHTML = data['wind']['speed'];
	
	query_data.value = '';
})

function validateSearch() {
	if (query_data.value.trim() == "") {
		alert('Поле запроса не должно быть пустым!');
		return false;
	} else if(query_data.value.length < 3) {
		alert('Слишком короткий запрос!');
		return false;
	}

	return true;
}

async function get_data(token, city, country, language, units) {
	request = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&exclude=current$&lang=${language}&appid=${token}`

	response = fetch(request)
		.then(res => res.json())
		.then(data => data)
		.catch(error => {
			return false;
		})


	return response
}
