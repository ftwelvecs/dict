import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Region} from "./region.interface";
import {RegionService} from "../services/region.service";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  // отказываемся от вызова событий для оповещения родительского компонента
  // @Output() onRegionAdded: EventEmitter<Region> = new EventEmitter<Region>()
  regions: Array<Region> = []

  modalId = 'regionModal'
  modalTitle = 'Добавление региона'
  regionFields = [{
    id: 'regionName',
    label: 'Название региона',
    // значение соответствует поле объекта, который будет сохранен
    // например при post запросе значение будет использоваться как ключ
    // post -> { name: 'Какое-то значение' }
    name: 'name',
    type: 'text',
    controlType: 'input'
  }]

  // внедряем RegionService
  constructor(public regionService: RegionService) { }

  ngOnInit(): void {
    this.regionService.getRegions()
      .subscribe(data => {
        this.regions.length = 0
        this.regions.push(...data)
      })
  }

  add(regionName: string) {
    const region: Region = {
      name: regionName
    }
    this.regionService.add(region)
  }

}
