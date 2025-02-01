import { useState, useTransition, version } from 'react';
import { Weather } from './types/weather';
import { delayMilisec } from './utils/delay';

const fetchAPI = async (city: string) => {
  await delayMilisec(1000);

  try {
    const BASE_URL = 'https://api.weatherapi.com/v1/current.json';
    const API_KEY = import.meta.env.VITE_API_KEY;
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}`);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = (await response.json()) as Weather;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return 'Error fetching city';
  }
};

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather>();

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(async () => {
      const data = await fetchAPI(city);
      if (typeof data !== 'string') {
        setWeather(data);
      } else {
        console.error(data);
      }
    });
  };

  return (
    <div>
      <h1>React version {version}</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? 'Loading...' : 'Get Weather'}
      </button>
      {weather && <pre>{JSON.stringify(weather, null, 2)}</pre>}
    </div>
  );
};

export default App;
