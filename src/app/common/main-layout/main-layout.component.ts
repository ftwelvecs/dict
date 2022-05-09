import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  tabs = [
    {
      label: 'Главная',
      link: '/home'
    },
    {
      label: 'Пользователи',
      link: '/users'
    },
    {
      label: 'Регионы',
      link: '/region'
    },
    {
      label: 'Департаменты',
      link: '/departments'
    },
    {
      label: 'Должности',
      link: '/positions'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
