import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Eraser, HandPlatter } from "lucide-react"
import { getFilteredReservations } from "@/api/get-filtered-reservations"
import { Status } from "@/types/enums"
import { FiltersValues } from "@/types/reservation"
import { Controller, useForm } from "react-hook-form"
import { useQuery } from "react-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FilterRservationsForm = ({ token }: { token: string | undefined }) => {
  const { control, watch, handleSubmit, reset } = useForm<FiltersValues>({
    defaultValues: {
      period: "daily",
      status: Status.CONFIRMED,
    },
  })

  const { period, status } = watch()

  const { data: filteredReservationsCount } = useQuery({
    queryKey: ["reservations", { period, status }],
    queryFn: () => getFilteredReservations(token, { period, status }),
  })

  function clearFilters() {
    reset({
      period: "daily",
      status: Status.CONFIRMED
    })
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(clearFilters)}>
      <div className="flex items-center gap-2">
        
        {/* period filter */}
        <Controller
          control={control}
          name="period"
          render={({ field: { name, onChange, value } }) => {
            return (
              <Select
                name={name}
                onValueChange={(newValue) => {
                  onChange(newValue)
                }}
                value={value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            )
          }}
        />
        
        {/* status filter */}
        <Controller
          control={control}
          name="status"
          render={({ field: { name, onChange, value } }) => {
            return (
              <Select
                name={name}
                onValueChange={(newValue) => {
                  onChange(newValue)
                }}
                value={value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="CANCELED">Canceled</SelectItem>
                </SelectContent>
              </Select>
            )
          }}
        />
        
        <Button>
          Clear <Eraser className="size-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All reservations</CardTitle>
            <HandPlatter className="size-5 text-muted-foreground" />
          </div>
          <CardDescription>Assign a type to know about reservations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end">
            <span className="text-6xl font-bold text-emerald-500">
              { filteredReservationsCount && filteredReservationsCount }
            </span>
            <p className="mb-1 ml-1 font-medium text-muted-foreground">
              reservations
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export default FilterRservationsForm