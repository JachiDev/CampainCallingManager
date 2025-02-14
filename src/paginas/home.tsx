import { useEffect, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCampaniasStore, Campania } from "../estados/campaniaStore";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag, TagProps } from "primereact/tag";
import { Button } from "primereact/button";
import { ToastContainer, toast } from "react-toastify";
import { confirmDialog } from "primereact/confirmdialog";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { formatDate } from "../utils/formDate";
import "../estilos/ListaCampañas.css";

const HomePage = () => {
  const { campanias, cambiarEstadoCampania, eliminarCampania, inicializarDatos } = useCampaniasStore();
  const navigate = useNavigate();
  const [dataKey, setDataKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    inicializarDatos();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();

      campanias.forEach((campania) => {
        const fechaInicio = new Date(campania.fechaInicio);

        if (campania.estado === "En Espera" && fechaInicio <= ahora) {
          cambiarEstadoCampania(campania.id, "Activa");
          toast.info(`📢 La campaña "${campania.nombre}" ha sido activada automáticamente.`);
        }
      });
    }, 60000);

    return () => clearInterval(intervalo);
  }, [campanias, cambiarEstadoCampania]);

  const getEstadoTemplate = useCallback((rowData: Campania) => {
    const severity: TagProps["severity"] =
      rowData.estado === "Activa" ? "success" :
      rowData.estado === "En Espera" ? "warning" :
      "info";

    return <Tag value={rowData.estado} severity={severity} />;
  }, []);

  const handleFinalizarCampania = useCallback((id: string) => {
    cambiarEstadoCampania(id, "Finalizada");
    toast.success("✅ Campaña finalizada!");
  }, [cambiarEstadoCampania]);

  const handleEliminarCampania = (id: string, estado: string) => {
    if (estado !== "En Espera") {
      toast.error("⚠️ Solo se pueden eliminar campañas en espera.");
      return;
    }

    confirmDialog({
      message: "¿Estás seguro de que quieres eliminar esta campaña?",
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        eliminarCampania(id);
        setDataKey((prevKey) => prevKey + 1);
        toast.success("🗑️ Campaña eliminada!");
      }
    });
  };

  const totalPersonas = useMemo(() => {
    return campanias.reduce((total, campania) => total + campania.personas.length, 0);
  }, [campanias]);

  const campañasFiltradas = useMemo(() => {
    return campanias.filter((campania) =>
      campania.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [campanias, searchTerm]);

  const headerForm = () => (
    <div className="flex justify-content-between align-items-center">
      <h3>📋 Lista de Campañas</h3>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar campaña..."
        />
      </span>
    </div>
  );

  return (
    <div className="flex justify-content-center">
      <Card title="📊 Resumen de Campañas">
        <div className="flex justify-content-between align-items-center mb-3">
          <h3>Total de personas a llamar: {totalPersonas}</h3>
          {campanias.length === 0 && (
            <Button
              label="Crear Campaña"
              icon="pi pi-plus"
              className="p-button-success"
              onClick={() => navigate("/campanias")}
            />
          )}
        </div>

        {campanias.length === 0 ? (
          <p>No existen campañas creadas. Por favor cree una para poder visualizarla.</p>
        ) : (
          <DataTable
            value={campañasFiltradas}
            paginator
            className="p-datatable-gridlines"
            showGridlines
            rows={5}
            key={dataKey}
            header={headerForm}
          >
            <Column field="nombre" header="Nombre" />
            <Column
              field="fechaCreacion"
              header="Fecha Creación"
              body={(rowData) => formatDate(rowData.fechaCreacion)}
            />
            <Column
              field="fechaInicio"
              header="Fecha Inicio"
              body={(rowData) => formatDate(rowData.fechaInicio)}
            />
            <Column
              field="grabarLlamados"
              header="Grabar?"
              body={(rowData) => (rowData.grabarLlamados ? "Sí" : "No")}
            />
            <Column field="estado" header="Estado" body={getEstadoTemplate} />
            <Column field="personas" header="Total Personas" body={(rowData) => rowData.personas.length} />
            <Column
              header="Acciones"
              body={(rowData: Campania) => (
                <div className="flex gap-3">
                  {rowData.estado === "Activa" && (
                    <Button label="Finalizar" icon="pi pi-check" onClick={() => handleFinalizarCampania(rowData.id)} />
                  )}
                  <Button
                    label="Eliminar"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => handleEliminarCampania(rowData.id, rowData.estado)}
                  />
                </div>
              )}
            />
          </DataTable>
        )}
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default HomePage;