import { Component, input } from '@angular/core';

import { Country } from '../../interfaces/country.interface';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  countries = input.required<Country[]>();

  //Creando los estados de carga
  errorMessage = input<string | unknown | null>();
  // Valores booleanos
  isLoading = input<boolean>(false);
  isEmpety = input<boolean>(false);
}
