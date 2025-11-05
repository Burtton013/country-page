import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  query = signal('');

  //Haciendo uso de rxResource debed importarlo de interop
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
