import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Region} from "./region.interface";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  @Output() onRegionAdded: EventEmitter<Region> = new EventEmitter<Region>()

  constructor() { }

  ngOnInit(): void {
  }

  add(regionName: string) {
    const region: Region = {
      name: regionName
    }
    this.onRegionAdded.emit(region)
  }

}
