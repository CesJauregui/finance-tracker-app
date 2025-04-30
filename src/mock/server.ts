// Este archivo simula una API para pruebas locales
// En un entorno real, este archivo no sería necesario

import type { Transaction, FinancialSummaryData } from "../services/api"

// Datos iniciales de ejemplo
const transactions: Transaction[] = [
  {
    id: 1,
    description: "Supermercado",
    amount: 85.5,
    date: "2023-05-15",
    type: "expense",
    category: "food",
  },
  {
    id: 2,
    description: "Salario",
    amount: 1500.0,
    date: "2023-05-10",
    type: "income",
    category: "salary",
  },
  {
    id: 3,
    description: "Gasolina",
    amount: 45.0,
    date: "2023-05-08",
    type: "expense",
    category: "transport",
  },
  {
    id: 4,
    description: "Cena restaurante",
    amount: 65.75,
    date: "2023-05-05",
    type: "expense",
    category: "food",
  },
  {
    id: 5,
    description: "Trabajo freelance",
    amount: 350.0,
    date: "2023-05-03",
    type: "income",
    category: "freelance",
  },
]

// Función para calcular el resumen financiero
function calculateSummary(): FinancialSummaryData {
  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  return {
    balance: income - expenses,
    income,
    expenses,
  }
}

// Función para calcular gastos por categoría
function calculateExpensesByCategory() {
  const expensesByCategory: Record<string, number> = {}

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!expensesByCategory[t.category]) {
        expensesByCategory[t.category] = 0
      }
      expensesByCategory[t.category] += t.amount
    })

  return Object.entries(expensesByCategory).map(([category, value]) => ({
    category,
    value,
  }))
}

// Interceptar las llamadas fetch para simular una API
const originalFetch = window.fetch

window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input.url

  // Simular un pequeño retraso para ver los estados de carga
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  // Interceptar llamadas a nuestra API simulada
  if (url.includes("/api/transactions")) {
    if (init?.method === "POST") {
      return delay(500).then(() => {
        const newTransaction = JSON.parse(init.body as string)
        const transaction: Transaction = {
          ...newTransaction,
          id: transactions.length + 1,
        }
        transactions.push(transaction)
        return new Response(JSON.stringify(transaction), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      })
    } else {
      // GET request
      return delay(500).then(() => {
        return new Response(JSON.stringify(transactions), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      })
    }
  }

  if (url.includes("/api/summary")) {
    return delay(500).then(() => {
      const summary = calculateSummary()
      return new Response(JSON.stringify(summary), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    })
  }

  if (url.includes("/api/expenses/by-category")) {
    return delay(500).then(() => {
      const expensesByCategory = calculateExpensesByCategory()
      return new Response(JSON.stringify(expensesByCategory), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    })
  }

  // Si no es una de nuestras rutas simuladas, pasar al fetch original
  return originalFetch(input, init)
}

export function setupMockServer() {
  console.log("Mock API server initialized")
}
