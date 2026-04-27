/**
 * Finds overlapping intervals between multiple sets of working hours.
 * Each member has an array of [startUTC, endUTC] minutes.
 * Working hours can wrap around midnight UTC.
 */
export const findOverlaps = (members) => {
  if (!members || members.length === 0) return [];

  // Initialize a 1440-minute array representing a full UTC day
  const timeline = new Array(1440).fill(0);

  members.forEach(member => {
    let start = member.startUTC;
    let end = member.endUTC;

    if (start <= end) {
      // Normal range
      for (let i = start; i < end; i++) {
        timeline[i]++;
      }
    } else {
      // Wraps around midnight
      for (let i = start; i < 1440; i++) {
        timeline[i]++;
      }
      for (let i = 0; i < end; i++) {
        timeline[i]++;
      }
    }
  });

  const overlaps = [];
  let currentStart = null;
  const memberCount = members.length;

  for (let i = 0; i < 1440; i++) {
    if (timeline[i] === memberCount) {
      if (currentStart === null) currentStart = i;
    } else {
      if (currentStart !== null) {
        overlaps.push({ start: currentStart, end: i });
        currentStart = null;
      }
    }
  }
  if (currentStart !== null) {
    overlaps.push({ start: currentStart, end: 1440 });
  }

  return overlaps;
};

/**
 * If no full overlap, suggest a compromise (where most people are available)
 */
export const suggestCompromise = (members) => {
  if (!members || members.length === 0) return null;

  const timeline = new Array(1440).fill(0);
  members.forEach(member => {
    let start = member.startUTC;
    let end = member.endUTC;
    if (start <= end) {
      for (let i = start; i < end; i++) timeline[i]++;
    } else {
      for (let i = start; i < 1440; i++) timeline[i]++;
      for (let i = 0; i < end; i++) timeline[i]++;
    }
  });

  let maxCount = 0;
  for (let i = 0; i < 1440; i++) {
    if (timeline[i] > maxCount) maxCount = timeline[i];
  }

  const bestWindows = [];
  let currentStart = null;
  for (let i = 0; i < 1440; i++) {
    if (timeline[i] === maxCount) {
      if (currentStart === null) currentStart = i;
    } else {
      if (currentStart !== null) {
        bestWindows.push({ start: currentStart, end: i, count: maxCount });
        currentStart = null;
      }
    }
  }
  if (currentStart !== null) {
    bestWindows.push({ start: currentStart, end: 1440, count: maxCount });
  }

  // Return the longest window with the most people
  return bestWindows.sort((a, b) => (b.end - b.start) - (a.end - a.start))[0];
};
