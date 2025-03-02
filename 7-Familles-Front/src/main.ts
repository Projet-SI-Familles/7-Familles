import { RootComponent } from './app/components/root/root.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';

bootstrapApplication(RootComponent, appConfig)
  .catch((err) => console.error(err));
