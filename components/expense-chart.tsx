"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function ExpenseChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Datos de ejemplo para el gráfico
    const data = [
      { category: "Alimentación", value: 350, color: "#ef4444" },
      { category: "Transporte", value: 150, color: "#f97316" },
      { category: "Vivienda", value: 500, color: "#3b82f6" },
      { category: "Entretenimiento", value: 100, color: "#8b5cf6" },
      { category: "Salud", value: 200, color: "#10b981" },
      { category: "Otros", value: 120, color: "#6b7280" },
    ]

    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Dibujar el gráfico de pastel
    let startAngle = 0

    data.forEach((item) => {
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
    const itemWidth = 300 / data.length

    data.forEach((item) => {
      // Dibujar el cuadrado de color
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, legendY, 15, 15)

      // Dibujar el texto
      ctx.fillStyle = "#000000"
      ctx.fillText(item.category, legendX + 30, legendY + 12)

      legendX += itemWidth
    })
  }, [])

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
