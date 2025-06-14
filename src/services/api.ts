export interface Transaction {
  id: number;
  description: string;
  amount: number;
  typeCategory: string;
  date: string;
  category: {
    id: number;
    typeCategory: string;
    nameCategory: string;
  };
  userId: number;
}

export interface CreateTransaction {
  description: string;
  amount: number;
  typeCategory: string;
  date: string;
  categoryId: number;
  userId: number;
}

export interface Category {
  id: number;
  nameCategory: string;
  typeCategory: string;
  userId: number;
}

export interface FinancialSummaryData {
  totalGeneral: number;
  totalByCategory: [
    {
      categoryType: string;
      total: number;
    }
  ];
}

const API_URL = import.meta.env.VITE_API_URL;

// Función para obtener todas las transacciones
export async function fetchTransactions(
  token: string | null
): Promise<Transaction[]> {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

// Función para crear una nueva transacción
export async function createTransaction({
  transaction,
  token,
}: {
  transaction: Omit<CreateTransaction, "id">;
  token: string | null;
}): Promise<CreateTransaction> {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
}

// Función para obtener las categorías
export async function fetchCategories(
  token: string | null
): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

// Función para registrar una categoría
export async function createCategory({
  category,
  token,
}: {
  category: Omit<Category, "id">;
  token: string | null;
}): Promise<Category> {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

// Función para obtener el resumen financiero
export async function fetchFinancialSummary(
  token: string | null
): Promise<FinancialSummaryData> {
  try {
    const response = await fetch(`${API_URL}/transactions/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching financial summary:", error);
    throw error;
  }
}

// Función para obtener datos para el gráfico de gastos por categoría
export async function fetchExpensesByCategory(): Promise<
  { category: string; value: number; color: string }[]
> {
  try {
    const response = await fetch(`${API_URL}/api/expenses/by-category`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    // Asignar colores a las categorías
    const colors = [
      "#ef4444",
      "#f97316",
      "#3b82f6",
      "#8b5cf6",
      "#10b981",
      "#6b7280",
    ];

    return data.map(
      (item: { category: string; value: number }, index: number) => ({
        ...item,
        color: colors[index % colors.length],
      })
    );
  } catch (error) {
    console.error("Error fetching expenses by category:", error);
    // Devolver datos de ejemplo en caso de error
    return [
      { category: "Alimentación", value: 350, color: "#ef4444" },
      { category: "Transporte", value: 150, color: "#f97316" },
      { category: "Vivienda", value: 500, color: "#3b82f6" },
      { category: "Entretenimiento", value: 100, color: "#8b5cf6" },
      { category: "Salud", value: 200, color: "#10b981" },
      { category: "Otros", value: 120, color: "#6b7280" },
    ];
  }
}
