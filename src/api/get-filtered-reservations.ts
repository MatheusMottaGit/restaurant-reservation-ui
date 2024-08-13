import { FiltersValues } from "@/types/reservation"
import { api } from "@/utils/axios"
import { handleErrors } from "./errors"
import { FilteredReservationsCountAPIResponse } from "@/types/api/responses"

export async function getFilteredReservations(token: string | undefined, { period, status }: FiltersValues): Promise<number> {
  try {
    const response = await api.get<FilteredReservationsCountAPIResponse>("/api/reservations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          period,
          status
        }
      }
    )

    const reservations = response.data.filterCountReservations
    
    console.log(response)
  
    return reservations
  } catch (error) {
    handleErrors(error)
    return 0
  }
}