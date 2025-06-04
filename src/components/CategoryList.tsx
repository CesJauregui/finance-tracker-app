"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../services/api";
import { SelectContent, SelectItem } from "./ui/Select";
import { useAuth } from "../context/AuthContext";
export function CategoryList({ transactionType }: { transactionType: string }) {
  const { token } = useAuth();
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(token),
  });

  if (isLoading) return <p>Cargando categorías...</p>;
  if (isError) return <p>Error al cargar categorías.</p>;

  // Filtrar según el tipo de transacción (expense o income)
  const filtered = categories?.filter(
    (category) => category.typeCategory === transactionType
  );
  return (
    <SelectContent>
      {filtered?.map((cat) => (
        <SelectItem value={cat.id.toString()} key={cat.id}>
          {cat.nameCategory}
        </SelectItem>
      ))}
    </SelectContent>
  );
}
