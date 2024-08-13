import { Role } from "./enums"
import { Reservation } from "./reservation"

export type User = {
  id: string
  name: string
  email: string
  password: string
  role: Role
  reservations: Reservation[]
}

export type JWTUserPayload = {
  id: string
  role: Role
}