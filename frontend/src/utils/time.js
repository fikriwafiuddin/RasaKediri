import { DateTime } from "luxon"

export const isRestaurantOpen = () => {
  const now = DateTime.now().setZone("Asia/Jakarta")
  const day = now.weekday
  const totalMinutes = now.hour * 60 + now.minute

  const weekdayStart = 10 * 60
  const weekdayEnd = 22 * 60

  const weekendStart = 9 * 60
  const weekendEnd = 23 * 60

  if (day >= 1 && day <= 5) {
    return totalMinutes >= weekdayStart && totalMinutes < weekdayEnd
  } else {
    return totalMinutes >= weekendStart && totalMinutes < weekendEnd
  }
}
