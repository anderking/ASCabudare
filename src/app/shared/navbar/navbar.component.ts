import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: [],
})
export class NavbarComponent implements OnInit {
  public user: CurrentUserModel;

  constructor(
    private auth: AuthService,
    private authFacadeService: AuthFacadeService
  ) {}

  ngOnInit() {
    this.authFacadeService
      .getCurrentUser$()
      .subscribe((user: CurrentUserModel) => {
        this.user = user;
      });
  }

  logout() {
    this.auth.logut();
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute);
  }
}
