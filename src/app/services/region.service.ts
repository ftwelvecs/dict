import {Region} from "../region/region.interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  regions: Array<Region> = []

  add(region: Region) {
    this.regions.push(region)
  }

  findByName(name: string): Region | undefined {
    return this.regions.find(region => region.name == name)
  }
}
