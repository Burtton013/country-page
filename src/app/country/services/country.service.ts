import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  // Inyectando el servicio http desde angular core
  private http = inject(HttpClient);

  //Creando un cache (propidad privada)
  //Como no forma parte de un cambio en el doom no haremos uso de señales
  //Haremos uso de un map

  private queryCacheCapital = new Map<string, Country[]>(); //Esto es un objeto vacio, ya esta inicializado
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  //Metodo para realizar el query por capital
  //Recuerda agregar que es de tipo Observable

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    //VERIFICACION DEL CACHE = Condicion en caso de que si exista algo dentro del cache
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []); //Hacemos nullish para que en caso de no existir retorno un arreglo vacio
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      //Operadores de rxjs para el observable
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      //Uso de efecto secundario de rxjs para almacenar el cache
      tap((countries) => this.queryCacheCapital.set(query, countries)),

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
        console.log('Error fetching'), error;
        return throwError(
          () => new Error(`El pais con codigo: '${code}' no existe`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      //Encadenando un pipe en un observable => ?? []).pipe(delay(2000)
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      catchError((error) => {
        console.log('Error fetcing'), error;
        return throwError(() => new Error(`El pais '${query}' no existe`));
      })
    );
  }

  searchByRegion(region: Region) {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        console.log('Error fetcing'), error;
        return throwError(() => new Error(`La región no existe`));
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
