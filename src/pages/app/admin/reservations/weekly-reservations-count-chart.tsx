import { getWeeklyReservationsCount } from "@/api/get-weekly-reservations-count"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { useQuery } from "react-query"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

const WeeklyReservationsCountChart = ({ token }: { token: string | undefined }) => {
  const { data: weekdaysReservationsAmount } = useQuery({
    queryKey: ["weekdaysReservationsAmount"],
    queryFn: () => getWeeklyReservationsCount(token),
  })

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Per Week</CardTitle>
          <Calendar className="size-5 text-muted-foreground" />
        </div>
        <CardDescription>Reservations amount for each weekday.</CardDescription>
      </CardHeader>
      <CardContent>
        {weekdaysReservationsAmount && (
          <ResponsiveContainer height={300}>
            <RadarChart outerRadius={90} data={weekdaysReservationsAmount}>
              <PolarGrid />
              <PolarAngleAxis dataKey="weekday" />
              <PolarRadiusAxis angle={30} domain={[0, 20]} />
              <Radar name="Amount" dataKey="reservationsAmount" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default WeeklyReservationsCountChart
