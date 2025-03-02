import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-defeat',
  templateUrl: './defeat.component.html',
  styleUrls: ['./defeat.component.css'],
})
export class DefeatComponent {
  constructor(private router: Router) {}

  restartGame() {
    this.router.navigate(['/']);
  }
}
