import {Region} from "../region/region.interface";

export class RegionService {
  regions: Array<Region> = []

  add(region: Region) {
    this.regions.push(region)
  }

}
