import { useState, useTransition } from 'react';

const fetchAPI = async () => {
  // await delayMilisec(1000);
  try {
    // const BASE_URL = 'https://procesos.inmovilla.com/api/v1';
    const BASE_URL = '/api2';
    // const TOKEN: string = '285614D5D34FC0B8F513A385895698F0';
    const TOKEN = import.meta.env.VITE_TOKEN2 as string;
    console.log(import.meta.env);
    console.log(TOKEN);

    const response = await fetch(`${BASE_URL}/propiedades/?listado`, {
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
  // const [city, setCity] = useState('');
  const [data, setData] = useState();

  const handleSubmit = async () => {
    startTransition(async () => {
      const data = await fetchAPI();
      if (typeof data !== 'string') {
        setData(data);
      } else {
        console.log(data);
      }
    });
  };

  return (
    <div>
      <h1>React version </h1>
      {/* <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      /> */}
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? 'Loading...' : 'Petición'}
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default ApiRest;
