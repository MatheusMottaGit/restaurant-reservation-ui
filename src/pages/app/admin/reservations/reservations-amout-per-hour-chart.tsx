import { getReservationsAmountPerHour } from "@/api/get-reservations-amount-per-hour"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FilterPerHourValues } from "@/types/reservation"
import { HandPlatter } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { useQuery } from "react-query"
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"

const ReservationsAmountPerHourChart = ({ token }: { token: string | undefined }) => {
  const { control, watch } = useForm<FilterPerHourValues>({
    defaultValues: {
      period: "daily",
    },
  })

  const period = watch("period")

  const { data: reservationsAmountPerHour } = useQuery({
    queryKey: ["reservationsAmountPerHour", period],
    queryFn: () => getReservationsAmountPerHour(token, { period }),
  })

  return (
    <div className="flex flex-col gap-2">
      {/* period Filter */}
      <Controller
        control={control}
        name="period"
        render={({ field: { name, onChange, value } }) => (
          <Select name={name} onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All reservations</CardTitle>
            <HandPlatter className="size-5 text-muted-foreground" />
          </div>
          <CardDescription>Reservations count by hour for the selected period.</CardDescription>
        </CardHeader>
        <CardContent>
          {reservationsAmountPerHour && (
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart
                width={730} 
                height={250} 
                innerRadius="10%" 
                outerRadius="80%" 
                startAngle={180} 
                endAngle={0}
                data={reservationsAmountPerHour}
              >
                <RadialBar 
                  label={{ fill: '#10b981', position: 'insideStart' }} 
                  background dataKey="reservationsAmount" 
                />
              </RadialBarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ReservationsAmountPerHourChart
