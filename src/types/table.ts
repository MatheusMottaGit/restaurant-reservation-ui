import { Reservation } from "./reservation"

export type Table = {
  id: number
  capacity: number
  description: string
  reservations: Reservation[]
}