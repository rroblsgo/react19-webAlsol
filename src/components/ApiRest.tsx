import { useState, useTransition } from 'react';

const fetchAPI = async () => {
  // await delayMilisec(1000);
  try {
    // const BASE_URL = 'https://procesos.inmovilla.com/api/v1';
    const BASE_URL = '/api';
    const TOKEN = import.meta.env.VITE_TOKEN as string;
    console.log(TOKEN);

    const response = await fetch(`${BASE_URL}/propiedades/?cod_ofer=23668105`, {
      method: 'GET',
      headers: {
        Token: `${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return 'Error fetching data';
  }
};

function ApiRest() {
  const [isPending, startTransition] = useTransition();
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState();

  const handleSubmit = async () => {
    startTransition(async () => {
      const data = await fetchAPI();
      if (typeof data !== 'string') {
        setWeather(data);
      } else {
        console.log(data);
      }
    });
  };

  return (
    <div>
      <h1>React version </h1>
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
}

export default ApiRest;
