import { getReservationsAmountPerHour } from "@/api/get-reservations-amount-per-hour"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Activity } from "lucide-react"
import { useQuery } from "react-query"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const ReservationsAmountPerHourChart = ({ token }: { token: string | undefined }) => {
  const { data: reservationsAmountPerHour } = useQuery({
    queryKey: ["reservationsAmountPerHour"],
    queryFn: () => getReservationsAmountPerHour(token),
  })

  return (
    <div className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Rush hours</CardTitle>
            <Activity className="size-5 text-emerald-500" />
          </div>
          <CardDescription>Per month, is important to separate the most reservation hours.</CardDescription>
        </CardHeader>
        <CardContent>
          {reservationsAmountPerHour && (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                width={500}
                height={300}
                style={{ fontSize: 14 }}
                data={reservationsAmountPerHour}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" style={{ fontSize: 14 }}/>
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reservationsAmount" stroke="#10b981"/>
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ReservationsAmountPerHourChart
