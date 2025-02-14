import { useForm } from "react-hook-form";
import { useCampaniasStore } from "../estados/campaniaStore";
import { v4 as uuidv4 } from "uuid";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import "./estilos/FormularioCampania.css";

interface CampaniaFormData {
  nombre: string;
  fecha: Date;
  hora: Date;
  grabarLlamados: boolean;
}

const FormularioCampania = React.memo(() => {
  const { agregarCampania } = useCampaniasStore();
  const { register, handleSubmit, setValue, watch, reset } = useForm<CampaniaFormData>();
  const [fecha, setFecha] = useState<Date | null>(null);
  const [hora, setHora] = useState<Date | null>(null);

  const onSubmit = (data: CampaniaFormData) => {
    if (!fecha || !hora) {
      toast.error("⚠️ Debe seleccionar tanto la fecha como la hora.");
      return;
    }

    const fechaCompleta = new Date(fecha);
    fechaCompleta.setHours(hora.getHours(), hora.getMinutes());

    agregarCampania({
      id: uuidv4(),
      nombre: data.nombre,
      fechaCreacion: new Date().toISOString(),
      fechaInicio: fechaCompleta.toISOString(),
      grabarLlamados: data.grabarLlamados,
      estado: "En Espera",
      personas: [],
    });

    toast.success("✅ Campaña creada exitosamente!");
    reset();
    setFecha(null);
    setHora(null);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-fluid formgrid grid">
              <div className="field col-12">
                <label htmlFor="nombre">Nombre de la Campaña</label>
                <InputText id="nombre" {...register("nombre", { required: "El nombre es obligatorio" })} />
              </div>
              <div className="field col-12 md:col-5">
                <label htmlFor="fecha" className="font-bold block mb-2">
                  Fecha de Inicio
                </label>
                <Calendar 
                  id="fecha" 
                  value={fecha} 
                  onChange={(e) => {
                    setFecha(e.value as Date);
                    setValue("fecha", e.value as Date);
                  }} 
                  dateFormat="dd/mm/yy"
                />
              </div>
              <div className="field col-12 md:col-5">
                <label htmlFor="hora" className="font-bold block mb-2">
                  Hora de Inicio
                </label>
                <Calendar 
                  id="hora" 
                  value={hora} 
                  onChange={(e) => {
                    setHora(e.value as Date);
                    setValue("hora", e.value as Date);
                  }} 
                  showTime 
                  hourFormat="24" 
                  timeOnly 
                />
              </div>
              <div className="field col-12 md:col-2">
                <Checkbox
                  id="grabarLlamados"
                  onChange={(e) => setValue("grabarLlamados", e.checked || false)}
                  checked={!!watch("grabarLlamados")}
                />
                <label htmlFor="grabarLlamados">Grabar Llamados</label>
              </div>
            </div>
            <Button type="submit" label="Crear Campaña" icon="pi pi-plus" />
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
});

export default FormularioCampania;
