import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    let lang: string = localStorage.getItem("lang");
    this.translateService.setDefaultLang(
      lang != "null" && lang != null ? lang : "es"
    );
    this.translateService.use(lang != "null" && lang != null ? lang : "es");
  }
}
