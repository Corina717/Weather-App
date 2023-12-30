//3e8a9824c85740a7e4848477293becc3

const input = document.querySelector("input");

async function getCityCoordinates(cityName)
{
    try
    {
        const rawData = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=3e8a9824c85740a7e4848477293becc3`)
        const data = await rawData.json();
        console.log("getCityCoordinates: ");
        console.log(data);
        return {
            cityLatitude: data[0].lat,
            cityLongitude: data[0].lon
        }
    }
    catch (error)
    {
        console.error("Error when fetching the coordinates data: ", error);
        throw error;
    }
}

async function getCityWeather(cityCoordinates)
{
    try
    {
        const rawWeatherInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityCoordinates.cityLatitude}&lon=${cityCoordinates.cityLongitude}&appid=3e8a9824c85740a7e4848477293becc3&units=metric`);
        const weatherInfo = await rawWeatherInfo.json();
        console.log("getCityWeather: ");
        console.log(weatherInfo);
        return weatherInfo;
    }
    catch (error)
    {
        console.error("Error when fetching weather info data: ", error);
        throw error;
    }
}

input.addEventListener("keydown", async (event) =>
{
    if (event.code === "Enter")
    {
        event.preventDefault();
        const cityName = input.value;
        try
        {
            if (cityName)
            {
                const cityCoordinates = await getCityCoordinates(cityName);
                const cityWeather = await getCityWeather(cityCoordinates);

                const outputContainer = document.querySelector(".output-container");
                const temperature = document.querySelector(".temperature");
                const city = document.querySelector(".city");

                outputContainer.style.display = "flex";
                temperature.innerHTML = cityWeather.main.temp + " &#8451";
                city.innerHTML = cityWeather.name;

            }
        }
        catch (error)
        {
            console.error("Error processing weather data: ", error);
            outputContainer.style.display = "none";
        }
        finally
        {
            input.value = "";
        }
    }
})