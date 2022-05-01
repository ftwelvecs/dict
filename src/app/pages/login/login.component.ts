import {Component, OnInit} from '@angular/core';
import {AuthHolderService} from "../../services/auth-holder.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  /*
  *   1. мы должны создать объект FormGroup
  *   2. для этого нам нужен FormBuilder, его мы инджектим в конструкторе
  *   3. необходимо импортировать в AppModule -> ReactiveFormsModule
  *   4. через formBuilder.group создаем контролы
  *   5. навешываем form на шаблон -> <form [formGroup]="form">
      6. навешываем контролы на шаблон -> <input formControlName="username">
  * */

  constructor(
    private authHolderService: AuthHolderService,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)], []),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.authHolderService.login(this.form.value);
  }

}
