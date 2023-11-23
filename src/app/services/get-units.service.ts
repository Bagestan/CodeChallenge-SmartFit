import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Location, UnitsResponse } from '../components/types/UnitTypes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  private readonly API =
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  private allUnitsSubject = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> =
    this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitsResponse>(this.API).subscribe((data) => {
      this.allUnitsSubject.next(data.locations);
      this.filteredUnits = data.locations;
    });
  }

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$;
  }

  getFilteredUnits() {
    return this.filteredUnits;
  }

  setFilteredUnits(value: Location[]) {
    this.filteredUnits = value;
  }
}
