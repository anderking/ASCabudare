import { Component, OnInit, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private _translateService = inject(TranslateService);

  ngOnInit(): void {
    let lang: string = localStorage.getItem("lang");
    this._translateService.setDefaultLang(
      lang != "null" && lang != null ? lang : "es"
    );
    this._translateService.use(lang != "null" && lang != null ? lang : "es");
  }
}
