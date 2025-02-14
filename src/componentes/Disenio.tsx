import { Outlet } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import "./estilos/Disenio.css";

const Disenio = () => {
  const items = [
    { label: "Home", icon: "pi pi-home", command: () => (window.location.href = "/") },
    { label: "Campañas", icon: "pi pi-table", command: () => (window.location.href = "/campanias") },
  ];

  return (
    <div className="layout">
      <Menubar model={items}/>
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">Copyright © 2019 FRONEUS - Todos los derechos reservados a AI Services SA.</footer>
    </div>
  );
};

export default Disenio;
