// Define types
interface Extra {
  key: string;
  value: string;
}

interface InfoItem {
  nombre: string;
  valor: number;
}

interface Info {
  [key: string]: InfoItem[];
}

// Function to transform extras array
export function transformExtras(extras: Extra[], info: Info): Extra[] {
  return extras.map(({ key, value }) => {
    const matchedItem = info[key]?.find(
      (item) => item.valor.toString() === value
    );
    // console.log('matchedItem:', matchedItem);
    return {
      key,
      value: matchedItem ? matchedItem.nombre : value,
    };
  });
}
