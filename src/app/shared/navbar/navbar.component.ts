import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { TranslateService } from "@ngx-translate/core";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: [],
})
export class NavbarComponent implements OnInit {
  public user: CurrentUserModel;
  public changeLang: string;
  public lang: boolean;
  public langStorage = localStorage.getItem("lang");
  public finisher$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private authFacadeService: AuthFacadeService,
    private translateService: TranslateService
  ) {
    if (this.langStorage === "en") {
      this.lang = true;
    }
    if (this.langStorage === "es") {
      this.lang = false;
    }
  }

  ngOnInit() {
    this.changeLang = "EN";
    this.authFacadeService
      .getCurrentUser$()
      .pipe(takeUntil(this.finisher$))
      .subscribe((user: CurrentUserModel) => {
        this.user = user;
      });
  }

  logout() {
    this.auth.logout();
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute);
  }

  public changeLanguage(event: any): void {
    if (event) {
      localStorage.setItem("lang", "en");
      this.translateService.setDefaultLang("en");
      this.translateService.use("en");
    } else {
      localStorage.setItem("lang", "es");
      this.translateService.setDefaultLang("es");
      this.translateService.use("es");
    }
  }
}
