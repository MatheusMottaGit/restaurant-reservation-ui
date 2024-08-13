import { ReservationsPerHourAPIResponse } from "@/types/api/responses";
import { api } from "@/utils/axios";
import { handleErrors } from "./errors";
import { FilterPerHourValues } from "@/types/reservation";

export async function getReservationsAmountPerHour(token: string | undefined, { period }: FilterPerHourValues): Promise<{ hour: number; reservationsAmount: number; }[]> {
  try {
    const response = await api.get<ReservationsPerHourAPIResponse>('/api/rush/reservations', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        period
      }
    })

    const amount = response.data.amount
    return amount || []

  } catch (error) {
    handleErrors(error)
    return []
  }
}