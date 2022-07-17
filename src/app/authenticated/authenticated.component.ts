import { Component, OnInit } from "@angular/core";
import { AuthService } from "@services/auth/auth.service";

@Component({
  selector: "app-authenticated",
  templateUrl: "./authenticated.component.html",
  styleUrls: ["./authenticated.component.scss"],
})
export class AuthenticatedComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
//    this.authService.initAuthListener();
  }
}
