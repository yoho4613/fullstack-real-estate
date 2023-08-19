import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.name.common,
  label: `${country.name.common} ${country.flag}`,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;
  const getNZ = () => formattedCountries.find((country) => country.value === "New Zealand")
  return { getAll, getNZ };
};


export default useCountries;
