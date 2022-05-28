import {Component, OnInit} from '@angular/core';
import {AuthHolderService} from "../../services/auth-holder.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authHolderService: AuthHolderService
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authHolderService.logout()
  }
}
