import { Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { AppComponent } from './app.component';
import { VictoryComponent } from './components/victory/victory.component';
import { DefeatComponent } from './components/defeat/defeat.component';

export const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'game', component: AppComponent },
  { path: 'victory', component: VictoryComponent },
  { path: 'defeat', component: DefeatComponent },
  
];
