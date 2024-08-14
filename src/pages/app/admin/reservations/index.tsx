import { authContext } from "@/contexts/auth-context"
import WeeklyRservationsCountChart from "./weekly-reservations-count-chart"
import FilterRservationsForm from "./filter-reservations-form"
import CanceledReservationsDayRateCard from "./canceled-reservations-day-rate-card"
import ReservationsAmountPerHourChart from "./reservations-amout-per-hour-chart"

const ReservationsDashboardPage = () => {
  const { getToken } = authContext()
  
  const token = getToken()

  return (
    <>
      <h1 className="font-semibold text-3xl">Dashboard</h1>

      <div className="hidden items-start justify-center gap-6 rounded-lg md:grid lg:grid-cols-2 xl:grid-cols-">
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <ReservationsAmountPerHourChart token={token}/>

          <FilterRservationsForm token={token} />
        </div>

        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <WeeklyRservationsCountChart token={token} />

          <CanceledReservationsDayRateCard token={token} />
        </div>
      </div>
    </>
  )
}

export default ReservationsDashboardPage
