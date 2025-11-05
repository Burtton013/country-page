import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes'), //.then((m) => m.countryRoutes),
  },
  {
    path: '**',
    //En caso de necesitarse puedes redirigir a una pagina 404 que se haya creado previamente
    redirectTo: '',
  },
];
