import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'by-country-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  //Inyectamos el servicio
  countryService = inject(CountryService);

  //Creamos la señal para obtener el valor del input de busqueda
  query = signal('');

  // Haciando uso de resource() para manejar los datos async de la peticion http (busqueda query)
  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      );
    },
  });
}
