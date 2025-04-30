"use client"

import { useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "./ui/Card"
import { fetchExpensesByCategory } from "../services/api"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/Button"

export function ExpenseChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Usar React Query para obtener los datos del gráfico
  const {
    data: chartData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["expensesByCategory"],
    queryFn: fetchExpensesByCategory,
  })

  useEffect(() => {
    if (!canvasRef.current || !chartData || isLoading || isError) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    const total = chartData.reduce((sum, item) => sum + item.value, 0)

    // Dibujar el gráfico de pastel
    let startAngle = 0

    chartData.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      ctx.fillStyle = item.color
      ctx.beginPath()
      ctx.moveTo(150, 150)
      ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      startAngle += sliceAngle
    })

    // Dibujar el círculo central (para hacer un donut chart)
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.arc(150, 150, 60, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()

    // Dibujar la leyenda
    const legendY = 320
    ctx.textAlign = "center"
    ctx.font = "14px Arial"

    let legendX = 50
    const itemWidth = 300 / chartData.length

    chartData.forEach((item) => {
      // Dibujar el cuadrado de color
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, legendY, 15, 15)

      // Dibujar el texto
      ctx.fillStyle = "#000000"
      ctx.fillText(item.category, legendX + 30, legendY + 12)

      legendX += itemWidth
    })
  }, [chartData, isLoading, isError])

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center items-center min-h-[350px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Cargando datos del gráfico...</span>
        </CardContent>
      </Card>
    )
  }

  // Mostrar estado de error
  if (isError) {
    return (
      <Card>
        <CardContent className="p-6 text-center min-h-[350px] flex flex-col justify-center">
          <p className="text-red-500 mb-4">Error al cargar los datos del gráfico: {(error as Error).message}</p>
          <Button onClick={() => refetch()} className="mx-auto">
            Reintentar
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <canvas ref={canvasRef} width="300" height="350"></canvas>
        </div>
      </CardContent>
    </Card>
  )
}
