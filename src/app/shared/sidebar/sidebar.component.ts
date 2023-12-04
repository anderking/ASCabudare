import { Component, OnInit, inject } from "@angular/core";
import { AuthFacadeService } from "@facades/auth-facade.service";
import {
  faGauge,
  faTags,
  faUsers,
  faMoneyBillTransfer,
  faGear,
  faRightFromBracket,
  faBars,
  faXmark,
  faMoon,
  faLanguage,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { CurrentUserModel } from "@models/auth/current-user.model";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "@services/auth/auth.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  private _authService = inject(AuthService);
  private _authFacadeService = inject(AuthFacadeService);
  private _translateService = inject(TranslateService);

  public user: CurrentUserModel;
  public lang: boolean;
  public langStorage = localStorage.getItem("lang");
  public darkMode: boolean;
  public darkModeStorage = localStorage.getItem("dark-mode");
  public finisher$ = new Subject<void>();
  public faGauge = faGauge;
  public faTags = faTags;
  public faUsers = faUsers;
  public faMoneyBillTransfer = faMoneyBillTransfer;
  public faMoneyBill = faMoneyBill;
  public faGear = faGear;
  public faRightFromBracket = faRightFromBracket;
  public faBars = faBars;
  public faXmark = faXmark;
  public faMoon = faMoon;
  public faLanguage = faLanguage;

  ngOnInit() {
    this._authFacadeService
      .getCurrentUser$()
      .pipe(takeUntil(this.finisher$))
      .subscribe((user: CurrentUserModel) => {
        this.user = user;
      });
    this.initLanguage();
    this.initDarkMode();
    this.loadScript();
  }

  public initLanguage(): void {
    if (this.langStorage === "en") {
      this.lang = true;
      const circuloLang = document.querySelector(".circulo-lang");
      circuloLang.classList.toggle("prendido");
    }
    if (this.langStorage === "es") {
      this.lang = false;
    }
  }

  public initDarkMode(): void {
    if (this.darkModeStorage === "on") {
      this.darkMode = true;
      let body = document.body;
      body.classList.toggle("dark-mode");
      const circulo = document.querySelector(".circulo");
      circulo.classList.toggle("prendido");
    }
    if (this.darkModeStorage === "off") {
      this.darkMode = false;
    }
  }

  public loadScript(): void {
    const cloud = document.getElementById("cloud");
    const barraLateral = document.querySelector(".barra-lateral");
    const spans = document.querySelectorAll("span");
    const palanca = document.querySelector(".switch");
    const palancaLang = document.querySelector(".switch-lang");
    const circulo = document.querySelector(".circulo");
    const circuloLang = document.querySelector(".circulo-lang");
    const menu: any = document.querySelector(".menu");
    const main = document.querySelector("main");
    const nombre = document.querySelector(".nombre");

    menu.addEventListener("click", () => {
      barraLateral.classList.toggle("max-barra-lateral");
      if (barraLateral.classList.contains("max-barra-lateral")) {
        menu.children[0].style.display = "none";
        menu.children[1].style.display = "block";
      } else {
        menu.children[0].style.display = "block";
        menu.children[1].style.display = "none";
      }
      if (window.innerWidth <= 320) {
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        nombre.classList.add("oculto");
        spans.forEach((span) => {
          span.classList.add("oculto");
        });
      }
    });

    palanca.addEventListener("click", () => {
      this.darkMode = !this.darkMode;
      let body = document.body;
      body.classList.toggle("dark-mode");
      circulo.classList.toggle("prendido");
      this.changeDarkMode(this.darkMode);
    });

    palancaLang.addEventListener("click", () => {
      this.lang = !this.lang;
      this.changeLanguage(this.lang);
      circuloLang.classList.toggle("prendido");
    });

    cloud.addEventListener("click", () => {
      barraLateral.classList.toggle("mini-barra-lateral");
      main.classList.toggle("min-main");
      nombre.classList.toggle("d-none");
      spans.forEach((span) => {
        span.classList.toggle("oculto");
      });
    });
  }

  public changeLanguage(event: boolean): void {
    if (event) {
      localStorage.setItem("lang", "en");
      this._translateService.setDefaultLang("en");
      this._translateService.use("en");
    } else {
      localStorage.setItem("lang", "es");
      this._translateService.setDefaultLang("es");
      this._translateService.use("es");
    }
  }

  public changeDarkMode(event: boolean): void {
    if (event) {
      localStorage.setItem("dark-mode", "on");
    } else {
      localStorage.setItem("dark-mode", "off");
    }
  }

  public logout(): void {
    this._authService.logout();
    const actualRoute = window.location.origin;
    window.location.replace(actualRoute + "/auth");
  }
}
