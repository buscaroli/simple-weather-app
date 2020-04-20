console.log('Script is running...');

const locationForm = document.querySelector('form');
const search = document.querySelector('input');

const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clearing the messages before the query
    msg1.textContent = '';
    msg2.textContent = '';

    // Location entered in the input form
    const location = search.value;
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
            } else {
                msg1.textContent = 'Weather Forecast for  ' + data.location + '.';
                msg2.textContent = 'The temperature is ' + data.temperature +' C, the wind speed is ' + data.wind_speed + ' Km/h and the UV Index is ' + data.uv_index + '.';
            }

        });
    });
});