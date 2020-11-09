import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {environment, urlEndPointImg} from './environments/environment';

if (environment.production) {
  enableProdMode();
}
export class MainComponent{
  getBackgroundImage(): string {
    return urlEndPointImg+"/backgroundImage.png";
    // <img src="{{urlEndPointImg}}/backgroundImage.png" class="img-fluid" alt="Responsive image" name="imagen"
    //      style="background-size: cover">
  }
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
