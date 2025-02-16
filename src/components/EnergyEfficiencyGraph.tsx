import React from 'react';

interface EnergyEfficiencyProps {
  energyLetter: string; // 'A' to 'G'
  energyValue: number; // e.g., 148.4
  emissionsLetter: string; // 'A' to 'G'
  emissionsValue: number; // e.g., 28.61
}
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const calculatePosition = (letter: string) => {
  const positions = {
    A: 'top-[0px]',
    B: 'top-[35px]',
    C: 'top-[70px]',
    D: 'top-[105px]',
    E: 'top-[140px]',
    F: 'top-[175px]',
    G: 'top-[210px]',
  };
  return positions[letter as keyof typeof positions];
};

const calculateWidth = (letter: string) => {
  const widths = {
    A: 'w-[40%]',
    B: 'w-[47%]',
    C: 'w-[54%]',
    D: 'w-[61%]',
    E: 'w-[68%]',
    F: 'w-[75%]',
    G: 'w-[82%]',
  };
  return widths[letter as keyof typeof widths];
};
const calculateColor = (letter: string) => {
  const colors = {
    A: 'bg-[#00855a]',
    B: 'bg-[#1bb15a]',
    C: 'bg-[#8cc63f]',
    D: 'bg-[#fecd00]',
    E: 'bg-[#faae65]',
    F: 'bg-[#f58220]',
    G: 'bg-[#ed1c38]',
  };
  return colors[letter as keyof typeof colors];
};

const EnergyEfficiencyGraph: React.FC<EnergyEfficiencyProps> = ({
  energyLetter,
  energyValue,
  emissionsLetter,
  emissionsValue,
}) => {
  return (
    <div className="p-2 border rounded-md shadow-md max-w-5xl mx-auto">
      <div className="flex flex-row mb-1 py-2 justify-between items-center border px-2">
        <h2 className="text-sm md:text-xl">MUY EFICIENTE</h2>
        <div className="flex flex-row gap-x-8">
          <div className="">
            <p className="text-sm text-gray-700">Consumo de Energía</p>
            <p className="text-sm md:text-lg font-bold">
              {energyValue} kWh/m² año
            </p>
          </div>
          <div className="">
            <p className="text-sm text-gray-700">Emisiones</p>
            <p className="text-sm md:text-lg font-bold">
              {emissionsValue} kg CO₂/m² año
            </p>
          </div>
        </div>
      </div>

      <div className=" h-72 border border-gray-300 rounded-md py-2 px-2 flex flex-row justify-between">
        {/* Barras por letras */}
        <div className="w-[65%] relative border border-1 p-2">
          {letters.map((letter) => (
            <div
              className={`absolute ${calculatePosition(letter)} h-7 ${calculateWidth(letter)} ${calculateColor(letter)} flex items-center my-2`}
            >
              <span
                className={`absolute right-0 h-6 w-6 ${calculateColor(letter)} -mr-3 rotate-45`}
              >
                <span className="absolute right-[7px] -top-0 text-xl text-white font-semibold -rotate-45">
                  {letter}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* Valores energía  y emisiones*/}
        {letters.includes(energyLetter) == true ? (
          <div className="flex flex-row w-[40%] border">
            <div className="w-80 flex flex-row gap-x-1 relative justify-center border">
              <div
                className={`absolute ${calculatePosition(energyLetter)} h-7 w-[80%] ${calculateColor(energyLetter)} flex items-center my-2`}
              >
                <span
                  className={`absolute -left-3 h-6 w-6 ${calculateColor(energyLetter)} mr-3 rotate-45`}
                >
                  <span className="absolute left-3 -top-3 text-xl text-white font-semibold -rotate-45">
                    {energyLetter}
                  </span>
                </span>
              </div>
            </div>

            <div className="w-80 flex flex-row gap-x-1 relative justify-center border">
              <div
                className={`absolute ${calculatePosition(emissionsLetter)} h-7 w-[80%] ${calculateColor(emissionsLetter)} flex items-center my-2`}
              >
                <span
                  className={`absolute -left-3 h-6 w-6 ${calculateColor(emissionsLetter)} mr-3 rotate-45`}
                >
                  <span className="absolute left-3 -top-3 text-xl text-white font-semibold -rotate-45">
                    {emissionsLetter}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-2xl text-red-500 p-6 font-bold text-left">
            En Trámite
          </p>
        )}
      </div>

      <div className="flex flex-row mt-1 mb-2 py-4 justify-between items-center border px-2">
        <h2 className=" text-sm md:text-xl">POCO EFICIENTE</h2>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Nota: La información de esta propiedad puede haber cambiado, por lo
        tanto, no somos responsables de la fiabilidad de la información, por
        favor contacte con nosotros para conocer las características exactas.
      </p>
      <p className="mb-4">. . .</p>
    </div>
  );
};

export default EnergyEfficiencyGraph;
