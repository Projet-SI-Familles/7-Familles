import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-victory',
  templateUrl: './victory.component.html',
  styleUrls: ['./victory.component.css'],
})
export class VictoryComponent {
  constructor(private router: Router) {}

  restartGame() {
    this.router.navigate(['/']);
  }
}
