import { Region } from '../interfaces/region.type';
import { RESTCountry } from '../interfaces/rest-countries.interface';

export class RegionMapper {
  static mapRestCountryToRegion(restCountry: RESTCountry): Region {
    return {
      africa: restCountry.region,
    };
  }
}
