import { z } from "zod"
import { Status } from "./enums"

export type Reservation = {
  id: string
  date: string
  hour: string
  totalPeople: number
  status: Status
  userId: string
  tableId: string
}

export const reservationsFiltersSchema = z.object({
  period: z.enum(["daily", "weekly", "monthly"]).default("daily"),
  status: z.enum([Status.CANCELED, Status.CONFIRMED])
})

export const reservationsFiltersPerHourSchema = z.object({
  period: z.enum(["daily", "weekly", "monthly"]).default("daily"),
})

export type FiltersValues = z.infer<typeof reservationsFiltersSchema> 
export type FilterPerHourValues = z.infer<typeof reservationsFiltersPerHourSchema> 