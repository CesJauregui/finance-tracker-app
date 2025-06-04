"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";
import { fetchTransactions, type Transaction } from "../services/api";
import { Button } from "./ui/Button";
import { useAuth } from "../context/AuthContext";

// Función para obtener el icono según la categoría
function getCategoryIcon(type: string) {
  if (type === "INGRESO") {
    return <TrendingUp className="h-5 w-5" />;
  } else {
    return <TrendingDown className="h-5 w-5" />;
  }
}

export function TransactionList() {
  const { token } = useAuth();
  // Usar React Query para obtener las transacciones
  const {
    data: transactions,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(token),
  });

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          <span className="ml-2 text-gray-500">Cargando transacciones...</span>
        </CardContent>
      </Card>
    );
  }

  // Mostrar estado de error
  if (isError) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-500 mb-4">
            Error al cargar las transacciones: {(error as Error).message}
          </p>
          <Button onClick={() => refetch()}>Reintentar</Button>
        </CardContent>
      </Card>
    );
  }

  // Si no hay transacciones
  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No hay transacciones registradas.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {transactions.map((transaction: Transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.typeCategory === "GASTO"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {getCategoryIcon(transaction.typeCategory)}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold ${
                    transaction.typeCategory === "GASTO"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {transaction.typeCategory === "GASTO" ? "-" : "+"}$
                  {transaction.amount.toFixed(2)}
                </span>
                <Badge
                  variant={
                    transaction.typeCategory === "GASTO"
                      ? "destructive"
                      : "default"
                  }
                  className="capitalize"
                >
                  {transaction.typeCategory === "GASTO" ? (
                    <ArrowDownCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowUpCircle className="mr-1 h-3 w-3" />
                  )}
                  {transaction.typeCategory}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
