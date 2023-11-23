import { Injectable } from '@angular/core';
import { Location } from '../components/types/UnitTypes';

const OPENNING_HOURS = {
  morning: {
    first: '06',
    last: '12',
  },
  afternoon: {
    first: '12',
    last: '18',
  },
  night: {
    first: '18',
    last: '23',
  },
};

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root',
})
export class FilterUnitsService {
  constructor() {}

  filter(results: Location[], showClosed: boolean, hour: string) {
    let intermediateResults = results;

    if (!showClosed) {
      intermediateResults = results.filter(
        (location) => location.opened === true
      );
    }

    if (hour) {
      const openHour = OPENNING_HOURS[hour as HOUR_INDEXES].first;
      const closeHour = OPENNING_HOURS[hour as HOUR_INDEXES].last;
      return intermediateResults.filter((location) =>
        this.filterUnits(location, openHour, closeHour)
      );
    } else {
      return intermediateResults;
    }
  }

  private filterUnits(unit: Location, openHour: string, closeHour: string) {
    if (!unit.schedules) return true;

    let openHourFilter = parseInt(openHour, 10);
    let closeHourFilter = parseInt(closeHour, 10);

    let todaWeekDay = this.transformWeekDay(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {
      let scheduleHour = unit.schedules[i].hour;
      let sheduleWeekDay = unit.schedules[i].weekdays;

      if (todaWeekDay === sheduleWeekDay) {
        if (scheduleHour !== 'Fechada') {
          let [unitOpenHour, unitCloseHour] = scheduleHour.split(' às ');
          let unitOpenHourInt = parseInt(unitOpenHour.replace('h', ''), 10);
          let unitCloseHourInt = parseInt(unitCloseHour.replace('h', ''), 10);
          if (
            unitOpenHourInt >= openHourFilter &&
            unitCloseHourInt >= closeHourFilter
          ) {
            return true;
          } else return false;
        }
      }
    }
    return false;
  }

  private transformWeekDay(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sab.';
      default:
        return 'Seg. à Sex.';
    }
  }
}
