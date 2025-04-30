import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDownCircle, ArrowUpCircle, ShoppingBag, Home, Car, Coffee, Gift, Briefcase } from "lucide-react"

// Datos de ejemplo para las transacciones
const transactions = [
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

// Función para obtener el icono según la categoría
function getCategoryIcon(category: string, type: string) {
  if (type === "income") {
    if (category === "salary") return <Briefcase className="h-5 w-5" />
    if (category === "freelance") return <Briefcase className="h-5 w-5" />
    return <Gift className="h-5 w-5" />
  } else {
    if (category === "food") return <ShoppingBag className="h-5 w-5" />
    if (category === "transport") return <Car className="h-5 w-5" />
    if (category === "housing") return <Home className="h-5 w-5" />
    if (category === "entertainment") return <Coffee className="h-5 w-5" />
    return <ShoppingBag className="h-5 w-5" />
  }
}

export function TransactionList() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "expense" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}
                >
                  {getCategoryIcon(transaction.category, transaction.type)}
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${transaction.type === "expense" ? "text-red-600" : "text-green-600"}`}>
                  {transaction.type === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
                </span>
                <Badge variant={transaction.type === "expense" ? "destructive" : "default"} className="capitalize">
                  {transaction.type === "expense" ? (
                    <ArrowDownCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowUpCircle className="mr-1 h-3 w-3" />
                  )}
                  {transaction.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
