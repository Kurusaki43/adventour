import type { Location } from "../types/location";

export const calcCentroid = (locations: Location[]): [number, number] => {
  const locationsLength = locations.length;
  const centroidSum = locations.reduce(
    (acc, loc) => ({
      latSum: acc.latSum + loc.coordinates[0],
      longSum: acc.longSum + loc.coordinates[1],
    }),
    { latSum: 0, longSum: 0 }
  );
  return [
    centroidSum.longSum / locationsLength,
    centroidSum.latSum / locationsLength,
  ];
};
