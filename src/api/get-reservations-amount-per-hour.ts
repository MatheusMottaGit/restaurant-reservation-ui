import { ReservationsPerHourInMonthAPIResponse } from "@/types/api/responses";
import { api } from "@/utils/axios";
import { handleErrors } from "./errors";

export async function getReservationsAmountPerHour(token: string | undefined): Promise<{ hour: number; reservationsAmount: number; }[]> {
  try {
    const response = await api.get<ReservationsPerHourInMonthAPIResponse>('/api/rush/reservations', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })

    const amount = response.data.amount
    return amount || []

  } catch (error) {
    handleErrors(error)
    return []
  }
}