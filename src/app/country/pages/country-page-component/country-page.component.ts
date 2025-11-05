import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { CountryInformationPage } from './country-information-page/country-information-page';

@Component({
  selector: 'country-page-component',
  imports: [NotFound, CountryInformationPage],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryService = inject(CountryService);
  //Haciendalo con un snapshot
  // ActivatedRoute tiene el codigo de la ruta activa
  //.snapshot() nos permite usar la informacion como se encuentre en ese momento no es reactivo
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryService.searchByCountryByAlphaCode(request.code);
    },
  });
}
