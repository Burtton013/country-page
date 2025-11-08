import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  //Haciendo uso de rxResource debes importarlo de interop
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      // Agregamos 'of' ya que rxResource necesita retornar un observable
      // Of es una funcion que nos permite retornar un observable basado en lo que sea que mandemos invocar
      if (!request.query) return of([]);

      return this.countryService.searchByCapital(request.query);
    },
  });
}
