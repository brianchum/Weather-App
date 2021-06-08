import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../Graphql/Queries';
import './Home.css';

function Home() {
    const [citySearched, setCitySearched] = useState('');
    const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
        variables: { name: citySearched },
    });
    if (error) return <h1> Error found</h1>;
    if (data) {
        console.log(data);
    }

    return (
        <div className='home'>
            <h1 className='title'>Weather</h1>
            <input
                type='text'
                placeholder='City Name '
                onChange={(event) => {
                    setCitySearched(event.target.value);
                }}
            />

            <button onClick={() => getWeather()}> Search</button>
            <div className='weather'>
                {data && (
                    <>
                        <h1>
                            {data.getCityByName.name}
                            {', '}
                            {data.getCityByName.country}
                        </h1>
                        <h1>
                            Description :{' '}
                            {data.getCityByName.weather.summary.description}
                        </h1>
                        {/* <h1 onLoad='ConvertTemperature(data.getCityByName.weather.temperature.actual)'> */}
                        <h1>
                            Temperture : {'  '}
                            {Math.floor(
                                data.getCityByName.weather.temperature.actual -
                                    273
                            ) + ' '}
                            <span aria-label='°Celsius'>°C</span>
                            {/* {data.getCityByName.weather.temperature.actual} */}
                            {/*  above is x number and I need to print the number that x - 270 like convert the temperture to celsius */}
                        </h1>

                        {/* <p id='demo'></p> */}
                        <h1>
                            Humidity :{' '}
                            {data.getCityByName.weather.clouds.humidity} %
                        </h1>
                        <h1>
                            Wind speed : {data.getCityByName.weather.wind.speed}{' '}
                            mph
                        </h1>
                    </>
                )}
            </div>
            <h1 className='footer'>
                Created by Brian Chum | Information provided by{' '}
                <a href='https://github.com/konstantinmuenster/graphql-weather-api'>
                    Open Weather Map API
                </a>
            </h1>
        </div>
    );
}

// function Converter(int) {
//     let temp = int - 270;
//     return <h1>temp</h1>;
// }

export default Home;
