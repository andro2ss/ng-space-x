import { SpaceX } from '../models/spaceXList.model';

export function showFlights(
  spaceXList: SpaceX[] | undefined,
  nameFly: string,
  successFly: boolean,
  dateFly: Date[] | undefined,
  pageNum: number
) {
  const tempDate = new Date();
  return spaceXList
    ?.sort((a, b) => {
      return +new Date(b.date_utc) - +new Date(a.date_utc);
    })
    .filter(flight => {
      const compareDate = new Date(flight.date_utc);
      return compareDate <= tempDate;
    })
    .filter(flight => {
      if (nameFly.length > 1) {
        return flight.name === nameFly;
      } else {
        return flight;
      }
    })
    .filter(flight => {
      if (successFly) {
        return flight.success;
      } else {
        return flight;
      }
    })
    .filter(flight => {
      if (dateFly) {
        const dateFilterMin = new Date(dateFly[0]);
        const dateFilterMax = new Date(dateFly[1]);
        const tempDate = new Date(flight.date_utc);
        return tempDate >= dateFilterMin && tempDate <= dateFilterMax;
      } else {
        return flight;
      }
    })
    .filter((flight, index) => {
      const fromIndex = (pageNum - 1) * 20;
      const toIndex = pageNum * 20;
      return index >= fromIndex && index < toIndex;
    });
}
