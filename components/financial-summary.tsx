import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react"

export function FinancialSummary() {
  // Datos de ejemplo
  const balance = 1654.75
  const income = 1850.0
  const expenses = 195.25

  return (
    <>
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Balance Total</p>
              <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <ArrowUpCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ingresos</p>
              <p className="text-2xl font-bold text-green-600">+${income.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <ArrowDownCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gastos</p>
              <p className="text-2xl font-bold text-red-600">-${expenses.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
