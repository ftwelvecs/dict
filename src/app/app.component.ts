import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // можно внедрять внутри компонента,
  // но в данном случае мы получаем новый объект сервиса
  // providers: [RegionService]
})
export class AppComponent implements OnInit {
  components: string[] = ["home", "users", "region", "department"]

  ngOnInit() {
  }
}
