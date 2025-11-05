import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLayoutComponent } from './layout/country-layout/country-layout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page-component/country-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    //Mostrando las rutas hijas: https: ...localhost/country/by-capital
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      //Por country
      {
        path: 'by-country',
        component: ByCountryPageComponent,
      },
      //Por region
      {
        path: 'by-region',
        component: ByRegionPageComponent,
      },
      // Ruta ciudad con respectivo id
      {
        path: 'by/:code',
        component: CountryPageComponent,
      },
      //Podemos hacer una redireccion para no caer en la ruta de layout que no muestra nada
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];
// Exportamos por defecto para no hacer el .then() en las rutas
export default countryRoutes;
