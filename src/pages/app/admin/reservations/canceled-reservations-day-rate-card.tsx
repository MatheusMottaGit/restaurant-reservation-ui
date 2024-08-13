import { getCanceledReservationsDayRate } from "@/api/get-canceled-reservations-day-rate"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CalendarArrowDownIcon } from "lucide-react"
import { useQuery } from "react-query"

const CanceledReservationsDayRateCard = ({ token }: { token: string | undefined }) => {
  const { data: rate } = useQuery({
    queryKey: ["rate"],
    queryFn: () => getCanceledReservationsDayRate(token),
  })

  return (
    <Card className="h-fit">
      <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Rate</CardTitle>
            <CalendarArrowDownIcon className="size-5 text-muted-foreground" />
          </div>
          <CardDescription>Here's the rate of all canceled reservations actually.</CardDescription>
        </CardHeader>
      <CardContent>
      <div className="flex items-end">
            <span className="text-6xl font-bold text-emerald-500">
              { rate && rate.canceledRate }
            </span>
            <p className="mb-1 ml-1 font-medium text-muted-foreground">
              canceled reservations
            </p>
          </div>
      </CardContent>
    </Card>
  )
}

export default CanceledReservationsDayRateCard