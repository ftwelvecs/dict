import { Component, OnInit } from '@angular/core';
import {AuthHolderService} from "../../services/auth-holder.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authHolderService: AuthHolderService) { }

  ngOnInit(): void {
  }

  login() {
    this.authHolderService.login();
  }

}
