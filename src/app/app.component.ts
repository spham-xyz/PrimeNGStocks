import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuItems: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.menuItems = [
      { label: 'Portfolio', icon: 'fa-bank', routerLink: ['/portfolio'] },
      { label: 'Chart', icon: 'fa-line-chart', routerLink: ['/chart'] }
    ]
  }

}
