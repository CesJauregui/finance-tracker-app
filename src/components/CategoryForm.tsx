import { useState } from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../services/api";
import { useAuth } from "../context/AuthContext";

export function CategoryForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useAuth();

  const [formDataModal, setFormDataModal] = useState({
    nameCategory: "",
    typeCategory: "GASTO",
    userId: user.id,
  });
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState<string | null>(null);
  const { token } = useAuth();
  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      setFormDataModal({
        nameCategory: "",
        typeCategory: "GASTO",
        userId: user.id,
      });

      setFormError(null);
    },
    onError: (error) => {
      setFormError(
        `Error al guardar la categoría: ${(error as Error).message}`
      );
    },
  });

  const handleSelectChange = (value: string) => {
    setFormDataModal((prev) => ({ ...prev, typeCategory: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataModal({ ...formDataModal, nameCategory: e.target.value });
  };

  const handleCancel = () => {
    handleClose();
    setFormError(null);
  };

  const handleSubmitModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDataModal.nameCategory || !formDataModal.typeCategory) {
      setFormError("Por favor, completa los campos");
      return;
    }

    console.log("Datos del formulario:", formDataModal);
    const category = {
      nameCategory: formDataModal.nameCategory,
      typeCategory: formDataModal.typeCategory,
      userId: user.id,
    };

    mutation.mutate({ category, token });
    handleClose();
  };

  return (
    <>
      <Button type="button" variant={"link"} onClick={handleOpen}>
        Agregar Categoría
      </Button>
      {open && (
        <Modal
          onSubmit={handleSubmitModal}
          handleInputChange={handleInputChange}
          onClick={handleCancel}
          nameCategory={formDataModal.nameCategory}
          typeCategory={formDataModal.typeCategory}
          handleSelectChange={handleSelectChange}
          formError={formError}
        />
      )}
    </>
  );
}
