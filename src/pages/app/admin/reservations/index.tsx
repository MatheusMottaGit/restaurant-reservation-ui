import { authContext } from "@/contexts/auth-context"
import WeeklyRservationsCountChart from "./weekly-reservations-count-chart"
import FilterRservationsForm from "./filter-reservations-form"
import CanceledReservationsDayRateCard from "./canceled-reservations-day-rate-card"

const ReservationsDashboardPage = () => {
  const { getToken } = authContext()
  
  const token = getToken()

  return (
    <>
      <h1 className="font-semibold text-3xl">Dashboard</h1>

      <div className="grid grid-cols-3 flex-1 gap-4">
        <FilterRservationsForm token={token} />

        <WeeklyRservationsCountChart token={token} />

        <CanceledReservationsDayRateCard token={token} />
      </div>
    </>
  )
}

export default ReservationsDashboardPage
