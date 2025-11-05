import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  // Inyectando el servicio http desde angular core
  private http = inject(HttpClient);

  //Metodo para realizar el query por capital
  //Recuerda agregar que es de tipi Observable
  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      //Operadores de rxjs para el observable
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () =>
            new Error(
              `No se pudo obtener ningun país con ese query ( '${query}' )`
            )
        );
      })
    );
  }
  searchByCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      //Mapeamos lo anterior para que del arreglo resultado de la conversion anterior nos retorne unicamente el primer elementos
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetcing'), error;
        return throwError(
          () => new Error(`El pais con codigo: '${code}' no existe`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    console.log(query);
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fetcing'), error;
        return throwError(() => new Error(`El pais '${query}' no existe`));
      })
    );
  }
}

/*
  MANEJANDO ERRORES DESDE EL OBSERVABLE CON RXJS

  - Hacemos uso de catchError
    - Se debe importar desde rxjs
    - Debe de retornar tambien un observable o lanzar un error para que se detenga la ejecucion
      con un throwError


- Para ligarlo al manejo de errores en componete unicamente loguea el err

- delay = este operador de rxjs nos permite retrasar la respuesta de la peticion

*/
