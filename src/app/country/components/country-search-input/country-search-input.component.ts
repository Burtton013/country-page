import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})
export class CountrySearchInputComponent {
  placeHolder = input('Buscar');
  value = output<string>();

  //Creando nuestra señal para al macenar el valor de lo ultimo que hay escrito el usuario
  inputValue = signal<string>('');

  //Señal para el timer
  debounceTimer = signal<number>(300);
  // Para emitir el debounce haremos uso de un effect
  /*
    onCleanup: Es una funcion que se dispara cada que el efecto se va a limpiar
                - Se limpia cuando:
                    Se destruye el componente
                    Cuando la señal o el efecto se vuelve a disparar (cada que hay un nuevo valor en el input)

   */
  debounceEffect = effect((onCleanup) => {
    // Linea importante: Cuando Angular detecta que hay una señal dentro del efecto cada vez que esa señal cambie
    // se disparara el efecto.
    const value = this.inputValue();

    //Ocupamos un timeout para relentizar la emision de nuestro value
    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTimer());
    // llamamos la funcion y le pasamos el timeout
    onCleanup(() => {
      clearTimeout(timeOut);
    });
  });
}
