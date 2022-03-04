import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnDemandePreloadService } from 'src/app/strategies/on-demande-preload.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/user', title: 'Users',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/dashboard', title: 'Clients',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    { path: '/produit', title: 'Produits',  icon:'ni-pin-3 text-orange', class: '' },
    
    { path: '/admin/tables', title: 'Ventes',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Profile',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private preloadOnDemandService:OnDemandePreloadService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  preloadBundle(routePath) {
    routePath = routePath.substring(1)
    // console.log(routePath)
    this.preloadOnDemandService.startPreload(routePath)

  }
}
