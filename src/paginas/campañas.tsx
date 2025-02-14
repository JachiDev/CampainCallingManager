import { useState } from "react";
import { useCampaniasStore } from "../estados/campaniaStore";
import FormularioCampania from "../componentes/FormularioCampaña";
import FormularioAgregarPersona from "../componentes/FormularioAgregarPersona";
import { formatDate } from "../utils/formDate";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Campania } from "../estados/campaniaStore";
import { TagProps } from "primereact/tag";
import { ToastContainer } from "react-toastify";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";

const CampaniasPage = () => {
  const { campanias, puedeEditarCampania } = useCampaniasStore();
  const [mostrarDialogCampania, setMostrarDialogCampania] = useState(false);
  const [mostrarDialogPersona, setMostrarDialogPersona] = useState(false);
  const [campaniaSeleccionada, setCampaniaSeleccionada] = useState<Campania | null>(null);

  const getEstadoTemplate = (rowData: Campania) => {
    const severity: TagProps["severity"] =
      rowData.estado === "Activa" ? "success" :
      rowData.estado === "En Espera" ? "warning" :
      "info";

    return <Tag value={rowData.estado} severity={severity} />;
  };

  const handleAbrirDialogCampania = () => {
    setMostrarDialogCampania(true);
  };

  const handleCerrarDialogCampania = () => {
    setMostrarDialogCampania(false);
  };

  const handleAbrirDialogPersona = (campania: Campania) => {
    setCampaniaSeleccionada(campania);
    setMostrarDialogPersona(true);
  };

  const handleCerrarDialogPersona = () => {
    setCampaniaSeleccionada(null);
    setMostrarDialogPersona(false);
  };

  return (
    <div className="flex justify-content-center">
      <Card title="📞 Gestión de Campañas">
        <div className="flex justify-content-end mb-3">
          <Button
            label="Nueva Campaña"
            icon="pi pi-plus"
            className="p-button-primary"
            onClick={handleAbrirDialogCampania}
          />
        </div>
        <h2>📋 Lista de Campañas</h2>
        <DataTable value={campanias} paginator rows={5} key={campanias.length}>
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
          <Column
            header="Acciones"
            body={(rowData: Campania) => (
              <div className="flex gap-2">
                {puedeEditarCampania(rowData.id) ? (
                  <Button
                    label="Editar"
                    icon="pi pi-pencil"
                    className="p-button-warning"
                    onClick={() => handleAbrirDialogPersona(rowData)}
                  />
                ) : (
                  <Button label="Editar" icon="pi pi-pencil" className="p-button-warning" disabled />
                )}
              </div>
            )}
          />
        </DataTable>
      </Card>

      {/* Dialog para crear una nueva campaña */}
      <Dialog
        header="Crear Nueva Campaña"
        visible={mostrarDialogCampania}
        style={{ width: "50vw" }}
        modal
        onHide={handleCerrarDialogCampania}
      >
        <FormularioCampania />
      </Dialog>

      {/* Dialog para agregar personas a una campaña */}
      <Dialog
        header={`Agregar Personas a ${campaniaSeleccionada?.nombre}`}
        visible={mostrarDialogPersona}
        style={{ width: "50vw" }}
        modal
        onHide={handleCerrarDialogPersona}
      >
        {campaniaSeleccionada && <FormularioAgregarPersona idCampania={campaniaSeleccionada.id} />}
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CampaniasPage;