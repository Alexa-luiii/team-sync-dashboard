import { DateTime } from 'luxon';

/**
 * Converts a local time (HH:mm) in a specific timezone to UTC minutes of the day.
 * @param {string} time - Format "HH:mm"
 * @param {string} zone - Timezone string (e.g., "America/New_York")
 * @returns {number} - Minutes from start of UTC day (0-1439)
 */
export const localToUTCMinutes = (time, zone) => {
  const [hour, minute] = time.split(':').map(Number);
  const local = DateTime.fromObject({ hour, minute }, { zone });
  const utc = local.toUTC();
  return utc.hour * 60 + utc.minute;
};

/**
 * Converts UTC minutes to local time string in a specific timezone.
 * Always returns 12-hour format with AM/PM.
 * @param {number} utcMinutes - Minutes from start of UTC day
 * @param {string} zone - Timezone string
 * @returns {string} - Format "h:mm a"
 */
export const utcMinutesToLocal = (utcMinutes, zone) => {
  const utc = DateTime.fromObject({
    hour: Math.floor(utcMinutes / 60),
    minute: utcMinutes % 60
  }, { zone: 'utc' });
  return utc.setZone(zone).toFormat('h:mm a');
};

/**
 * Gets the current time in a specific timezone in 12-hour format.
 */
export const getCurrentTimeInZone = (zone) => {
  return DateTime.now().setZone(zone).toFormat('h:mm a');
};
