import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/views/main/home.component';
import {HOME_ROUTES} from "./views/home/home.routes";
import {NotFound} from "./components/not-found/not-found.component";

export const routes: Routes = [
    ...HOME_ROUTES,
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: "**", component: NotFound}
];
