import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';
export class CountryMapper {
  //static restCountry => Country

  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      //Usamos un .join() ya que algunos paises tienen 2 capitales
      capital: restCountry.capital?.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      svg: restCountry.flags.svg,
      name:
        restCountry.translations['spa'].common ??
        'Realiza la busqueda en Español',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
  }
  // satatic RestCountry => Country[]
  static mapRestCountryArrayToCountryArray(
    restCountries: RESTCountry[]
  ): Country[] {
    return restCountries.map(CountryMapper.mapRestCountryToCountry);
  }
}
