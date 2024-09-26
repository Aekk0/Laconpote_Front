import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-galerie',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './galerie.component.html',
  styleUrl: './galerie.component.css'
})
export class CookiesGalerieComponent {

}
