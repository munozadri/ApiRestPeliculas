import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { MoviesComponent } from './components/movies/movies.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';

const appRoutes : Routes = [
	{path: '', component: AboutComponent},
	{path: 'nosotros', component: AboutComponent},
	{path: 'peliculas', component: MoviesComponent},
	{path: 'crear-pelicula', component: CreateComponent},
	{path: 'contacto', component: ContactComponent},
	{path: '**', component: AboutComponent}
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);