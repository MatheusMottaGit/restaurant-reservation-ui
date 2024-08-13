import { getWeeklyReservationsCount } from "@/api/get-weekly-reservations-count"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
          <ResponsiveContainer height={200}>
            <RadarChart outerRadius={70} data={weekdaysReservationsAmount}>
              <PolarGrid />
              <PolarAngleAxis style={{ fontSize: 14 }} dataKey="weekday" />
              <PolarRadiusAxis angle={30} domain={[0, 20]} />
              <Radar name="Amount" dataKey="reservationsAmount" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-1">
        <div className="p-1 size-4 rounded opacity-80 border border-emerald-500 bg-emerald-400/80" /> 
        <span className="font-medium text-emerald-500 text-sm">Amount</span>
      </CardFooter>
    </Card>
  )
}

export default WeeklyReservationsCountChart
