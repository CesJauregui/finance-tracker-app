"use client";

import { useEffect } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { FinancialSummary } from "./components/FinancialSummary";
import { ExpenseChart } from "./components/ExpenseChart";
import { setupMockServer } from "./mock/server";
import "./App.css";

function App() {
  // Inicializar el servidor mock para pruebas locales
  useEffect(() => {
    // Solo inicializar el servidor mock si estamos en desarrollo
    if (import.meta.env.DEV) {
      setupMockServer();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Mi Gestor Financiero</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FinancialSummary />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Agregar Transacción</h2>
            <TransactionForm />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Distribución de Gastos
            </h2>
            <ExpenseChart />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Transacciones Recientes
          </h2>
          <TransactionList />
        </div>
      </main>
    </div>
  );
}

export default App;
