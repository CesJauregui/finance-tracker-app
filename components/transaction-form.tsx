"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export function TransactionForm() {
  const [transactionType, setTransactionType] = useState("expense")

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transaction-type">Tipo de Transacción</Label>
            <RadioGroup
              defaultValue="expense"
              className="flex space-x-4"
              onValueChange={setTransactionType}
              value={transactionType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense" className="cursor-pointer">
                  Gasto
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income" className="cursor-pointer">
                  Ingreso
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <Input id="amount" type="number" placeholder="0.00" className="pl-8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" placeholder="Ej. Compra de supermercado" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    transactionType === "expense"
                      ? "Seleccionar categoría de gasto"
                      : "Seleccionar categoría de ingreso"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {transactionType === "expense" ? (
                  <>
                    <SelectItem value="food">Alimentación</SelectItem>
                    <SelectItem value="transport">Transporte</SelectItem>
                    <SelectItem value="entertainment">Entretenimiento</SelectItem>
                    <SelectItem value="housing">Vivienda</SelectItem>
                    <SelectItem value="health">Salud</SelectItem>
                    <SelectItem value="other">Otros</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="salary">Salario</SelectItem>
                    <SelectItem value="freelance">Trabajo Freelance</SelectItem>
                    <SelectItem value="investment">Inversiones</SelectItem>
                    <SelectItem value="gift">Regalos</SelectItem>
                    <SelectItem value="other">Otros</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>

          <Button type="submit" className="w-full">
            {transactionType === "expense" ? "Registrar Gasto" : "Registrar Ingreso"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
