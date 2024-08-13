import { CanceledReservationsDayRateAPIResponse } from "@/types/api/responses";
import { api } from "@/utils/axios";
import { handleErrors } from "./errors";

export async function getCanceledReservationsDayRate(token: string | undefined): Promise<{ canceledRate: number; reservations: number; }> {
  try {
    const response = await api.get<CanceledReservationsDayRateAPIResponse>('/api/rate/reservations', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const rate = response.data.rate
    return rate

  } catch (error) {
    handleErrors(error)
    return {
      canceledRate: 0,
      reservations: 0
    }
  }
}