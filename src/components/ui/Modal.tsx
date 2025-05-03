import React from "react";
import { Input } from "./Input";
import { Label } from "./Label";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Button } from "./Button";
export function Modal({
  nameCategory,
  typeCategory,
  onSubmit,
  handleInputChange,
  onClick,
  handleSelectChange,
  formError,
}: {
  nameCategory: string;
  typeCategory: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  handleSelectChange: (value: string) => void;
  formError?: string | null;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Agregar Categoría</h2>
          {formError && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
              {formError}
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Input
                id="category"
                name="category"
                placeholder="Ej. Comida, Sueldo"
                value={nameCategory}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type-category">Tipo de Categoría</Label>
              <RadioGroup
                defaultValue="GASTO"
                className="flex space-x-4"
                onValueChange={handleSelectChange}
                value={typeCategory}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="GASTO" id="N_GASTO" />
                  <Label htmlFor="N_GASTO" className="cursor-pointer">
                    Gasto
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="INGRESO" id="N_INGRESO" />
                  <Label htmlFor="N_INGRESO" className="cursor-pointer">
                    Ingreso
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant={"secondary"} type="button" onClick={onClick}>
                Cancelar
              </Button>
              <Button type="submit">Registrar</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
