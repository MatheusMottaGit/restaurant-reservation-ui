import { api } from "@/utils/axios"
import { handleErrors } from "./errors"
import { WeeklyReservationsCountAPIResponse } from "@/types/api/responses"

export async function getWeeklyReservationsCount(token: string | undefined): Promise<{ weekday: string, reservationsAmount: number }[]> {
  try {
    const response = await api.get<WeeklyReservationsCountAPIResponse>("/api/weekdays/reservations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  
    const weekdaysReservationsAmount = response.data.weekdaysReservationsAmount
    // console.log(response.data)
  
    return weekdaysReservationsAmount || []
  } catch (error) {
    handleErrors(error)
    return []
  }
}