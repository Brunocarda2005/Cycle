import { Component } from "@angular/core";
import { DataViewModule } from "primeng/dataview";
import { CommonModule } from "@angular/common";
import { RatingModule } from "primeng/rating";
import { TagModule } from "primeng/tag";
import { FormsModule } from "@angular/forms";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { MenuItem } from "primeng/api";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { filter, map, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  standalone: true,
  imports: [
    DataViewModule,
    BreadcrumbModule,
    CommonModule,
    RatingModule,
    TagModule,
    FormsModule,
  ],
  styleUrl: "./nav.component.scss",
})
export class NavComponent {
  // item para el nav migaja de pan
  items: MenuItem[] = [];

  // link home
  home: MenuItem = { icon: "pi pi-home", routerLink: "/" };

  // title
  title: string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  // ruta de migaja de pan
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === "primary"),
        mergeMap((route) => route.url),
        map((urlSegments) => urlSegments.map((segment) => segment.path))
      )
      .subscribe((urlPaths) => {
        this.title = urlPaths[urlPaths.length - 1];
        this.items = urlPaths.map((path, index) => {
          return {
            label: path.charAt(0).toUpperCase() + path.slice(1), // Capitalize the first letter
            routerLink: `/${urlPaths.slice(0, index + 1).join("/")}`,
          };
        });
      });
  }
}
