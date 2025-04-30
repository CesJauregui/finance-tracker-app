"use client";

import type React from "react";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";
import { Select, SelectTrigger, SelectValue } from "./ui/Select";
import { Card, CardContent } from "./ui/Card";
import { createTransaction } from "../services/api";
import { Loader2 } from "lucide-react";
import { CategoryList } from "./CategoryList";

export function TransactionForm() {
  const queryClient = useQueryClient();
  const [transactionType, setTransactionType] = useState("GASTO");
  const [formData, setFormData] = useState({
    typeCategory: "GASTO",
    description: "",
    amount: "",
    categoryId: "",
    date: new Date().toISOString().split("T")[0],
    userId: 1,
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Usar React Query para la mutación (crear transacción)
  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      // Invalidar y refrescar las consultas después de una mutación exitosa
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["expensesByCategory"] });

      // Limpiar el formulario
      setFormData({
        typeCategory: "GASTO",
        description: "",
        amount: "",
        categoryId: "",
        date: new Date().toISOString().split("T")[0],
        userId: 1,
      });

      setFormError(null);
    },
    onError: (error) => {
      setFormError(
        `Error al guardar la transacción: ${(error as Error).message}`
      );
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, categoryId: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!formData.description || !formData.amount || !formData.categoryId) {
      setFormError("Por favor completa todos los campos");
      return;
    }

    // Crear objeto de transacción en el formato esperado por el API
    const transaction = {
      typeCategory: transactionType, // "GASTO" o "INGRESO"
      amount: Number.parseFloat(formData.amount), // Convertir a número
      description: formData.description,
      date: formData.date, // Fecha en formato "YYYY-MM-DD"
      categoryId: parseInt(formData.categoryId), // ID de la categoría (asegúrate de que sea un número)
      userId: 1, // ID del usuario (puedes reemplazarlo con el ID dinámico si es necesario)
    };

    console.log(transaction); // Depuración: Verifica el objeto antes de enviarlo

    // Enviar la transacción
    mutation.mutate(transaction);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {formError && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {formError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="transaction-type">Tipo de Transacción</Label>
            <RadioGroup
              defaultValue="GASTO"
              className="flex space-x-4"
              onValueChange={setTransactionType}
              value={transactionType}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="GASTO" id="GASTO" />
                <Label htmlFor="GASTO" className="cursor-pointer">
                  Gasto
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="INGRESO" id="INGRESO" />
                <Label htmlFor="INGRESO" className="cursor-pointer">
                  Ingreso
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Monto</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="pl-8"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              placeholder="Ej. Compra de supermercado"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              onValueChange={handleSelectChange}
              value={formData.categoryId}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    transactionType === "GASTO"
                      ? "Seleccionar categoría de gasto"
                      : "Seleccionar categoría de ingreso"
                  }
                />
              </SelectTrigger>
              <CategoryList transactionType={transactionType} />
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : transactionType === "GASTO" ? (
              "Registrar Gasto"
            ) : (
              "Registrar Ingreso"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
