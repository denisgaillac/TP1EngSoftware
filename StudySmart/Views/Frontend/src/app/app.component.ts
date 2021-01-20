import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Frontend';

  constructor(
    public router: Router
  ) {}

  navigatePerformance() {
    this.router.navigateByUrl('/performance');
  }
  navigateActivities() {
    this.router.navigateByUrl('/');
  }
}
