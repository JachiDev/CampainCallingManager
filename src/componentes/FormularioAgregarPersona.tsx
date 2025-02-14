import React from "react";
import { useForm } from "react-hook-form";
import { useCampaniasStore } from "../estados/campaniaStore";
import { v4 as uuidv4 } from "uuid";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface PersonaFormData {
  nombre: string;
  apellido: string;
  telefono: string;
}

const FormularioAgregarPersona = React.memo(({ idCampania }: { idCampania: string }) => {
  const { agregarPersona } = useCampaniasStore();
  const { register, handleSubmit, reset } = useForm<PersonaFormData>();

  const onSubmit = (data: PersonaFormData) => {
    agregarPersona(idCampania, { id: uuidv4(), ...data });
    reset();
  };

  return (
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText {...register("nombre", { required: true })} />
          </div>
          <div className="p-field">
            <label htmlFor="apellido">Apellido</label>
            <InputText {...register("apellido", { required: true })} />
          </div>
          <div className="p-field">
            <label htmlFor="telefono">Teléfono</label>
            <InputText {...register("telefono", { required: true })} />
          </div>
          <Button type="submit" label="Agregar" icon="pi pi-user-plus" />
        </form>
      </div>
  );
});

export default FormularioAgregarPersona;
