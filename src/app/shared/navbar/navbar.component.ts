import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { UserModel } from "@models/auth/user.model";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: [],
})
export class NavbarComponent implements OnInit {
  public user: UserModel;

  constructor(
    private _auth: AuthService,
    private authFacadeService: AuthFacadeService
  ) {}

  ngOnInit() {
    this.authFacadeService.getUser$().subscribe((user: UserModel) => {
      this.user = user;
    });
  }

  logout() {
    this._auth.logut();
  }
}
