import { Component } from '@angular/core';
import {urlEndPointImg} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clientes-App';

  getBackgroundImage(): string {
    return urlEndPointImg+"/backgroundImage.png";
      // <img src="{{urlEndPointImg}}/backgroundImage.png" class="img-fluid" alt="Responsive image" name="imagen"
      //      style="background-size: cover">
  }
}
