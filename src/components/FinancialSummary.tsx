"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "./ui/Card"
import { ArrowDownCircle, ArrowUpCircle, Wallet, Loader2 } from "lucide-react"
import { fetchFinancialSummary } from "../services/api"
import { Button } from "./ui/Button"

export function FinancialSummary() {
  // Usar React Query para obtener el resumen financiero
  const {
    data: summary,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["summary"],
    queryFn: fetchFinancialSummary,
  })

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white">
            <CardContent className="p-6 flex items-center justify-center h-[100px]">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </>
    )
  }

  // Mostrar estado de error
  if (isError) {
    return (
      <Card className="bg-white col-span-3">
        <CardContent className="p-6 text-center">
          <p className="text-red-500 mb-4">Error al cargar el resumen financiero: {(error as Error).message}</p>
          <Button onClick={() => refetch()}>Reintentar</Button>
        </CardContent>
      </Card>
    )
  }

  // Valores por defecto en caso de que no haya datos
  const balance = summary?.balance ?? 0
  const income = summary?.income ?? 0
  const expenses = summary?.expenses ?? 0

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
