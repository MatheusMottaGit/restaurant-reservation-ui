import { Role } from "../enums"

// auth
export type RegisterAPIResponse = {
  id: string
  name: string
  email: string
  password: string
  role: Role
}

export type LoginAPIResponse = {
  token: string
}
/* ------------------------------------------------ */

// reservations
export type FilteredReservationsCountAPIResponse = {
  filterCountReservations: number
}

export type WeeklyReservationsCountAPIResponse = {
  weekdaysReservationsAmount: {
    weekday: string
    reservationsAmount: number
  }[]
}

export type CanceledReservationsDayRateAPIResponse = {
  rate: {
    canceledRate: number,
    reservations: number
  }
}
/* ------------------------------------------------ */
