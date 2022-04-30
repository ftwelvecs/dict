import { Component, OnInit } from '@angular/core';
import {AuthHolderService} from "../../services/auth-holder.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authHolderService: AuthHolderService,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.form)
    // this.authHolderService.login(this.form.value);
  }

}
