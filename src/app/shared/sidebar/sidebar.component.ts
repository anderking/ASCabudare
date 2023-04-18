import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit {
  public user: CurrentUserModel;

  constructor(
    private auth: AuthService,
    private authFacadeService: AuthFacadeService
  ) {}

  ngOnInit() {
    this.authFacadeService.getCurrentUser$().subscribe((user: CurrentUserModel) => {
      this.user = user;
    });
  }

  logout() {
    this.auth.logout();
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute);
  }
}
