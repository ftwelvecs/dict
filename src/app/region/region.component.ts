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

  // внедряем RegionService
  constructor(private regionService: RegionService) { }

  ngOnInit(): void {
  }

  add(regionName: string) {
    const region: Region = {
      name: regionName
    }
    this.regionService.add(region)
  }

}
