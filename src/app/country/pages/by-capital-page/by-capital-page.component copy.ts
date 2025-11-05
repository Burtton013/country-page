import { Component, inject, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  //Inyectando el servicio para realizar las peticiones http
  // NullInjectorError = Debes recordar que tienes que proveer el objeto de peticiones http
  countryService = inject(CountryService);

  isLoading = signal(false);

  isError = signal<string | null>(null);

  //El uso de esta interfaz en esta señal no es lo recomendable
  countries = signal<Country[]>([]);

  //Metodo para obtener el valor del input desde el elemento hijo
  onSearch(query: string) {
    //Seteamos el valor de la señal para que tome el valor de la peticion
    // Si isLoading se encuentra en true no seguira con la carga de peticiones con el objetivo de no realizar demasiadas
    if (this.isLoading()) return;

    //Seteando la señal de loading a true
    this.isLoading.set(true);

    //Seteando el valor del error
    this.isError.set(null);

    //Conectando el metodo para busqueda con el servicio encargado de hacer la peticion

    this.countryService.searchByCapital(query).subscribe({
      next: (countries) => {
        //Seteamos el isLoading en false ya que terminamos de cargar la data de la api
        this.isLoading.set(false);

        //Almacenamos la respuesta de la peticion http en una variable (country)
        this.countries.set(countries);
      },
      error: (err) => {
        this.isLoading.set(false);
        //Limpiando el value
        this.countries.set([]);
        //Manejando el error
        this.isError.set(err);
      },
    });
  }
}
/*
  MANEJO DE ERRORES

  - Mandamos un objeto en el subscribe
    - next?(value) : Cuando todo sale bien y tenemos el siguiente valor del obsevable
    - error?: Cuando hay algun tipo de error/excepcion en el observable
    - complete?: Cuando termina el observable sin importar si hay errores

    NOTA: si tienes errores con el 'this' has una funcion de flecha


    MOSTRANDO EL ERROR EN UNCOMPONENTE

    - Para mostrar el error en un componente debes hacer un @if en el ocmponente
      para que renderize el texto

      @if (isError()){
            <h3>{{ this.isError() }}</h3>
          } @else{

            <country-list [countries]="countries()" />
            }
*/
