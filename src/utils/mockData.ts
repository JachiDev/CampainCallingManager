import { Campania } from "../estados/campaniaStore";

export const mockCampanias: Campania[] = [
  {
    id: "1",
    nombre: "Campania Enero",
    fechaCreacion: new Date("2024-01-01T08:00:00").toISOString(),
    fechaInicio: new Date("2024-01-05T09:00:00").toISOString(),
    grabarLlamados: true,
    estado: "En Espera",
    personas: [
      { id: "p1", nombre: "Juan", apellido: "Pérez", telefono: "123456789" }
    ]
  },
  {
    id: "2",
    nombre: "Campania Febrero",
    fechaCreacion: new Date("2024-02-01T08:30:00").toISOString(),
    fechaInicio: new Date("2024-02-07T10:00:00").toISOString(),
    grabarLlamados: false,
    estado: "Activa",
    personas: [
      { id: "p2", nombre: "Maria", apellido: "Gomez", telefono: "987654321" }
    ]
  },
  {
    id: "3",
    nombre: "Campania Marzo",
    fechaCreacion: new Date("2024-03-01T07:45:00").toISOString(),
    fechaInicio: new Date("2024-03-10T11:00:00").toISOString(),
    grabarLlamados: true,
    estado: "Finalizada",
    personas: [
      { id: "p3", nombre: "Carlos", apellido: "Fernández", telefono: "564738291" }
    ]
  },
  {
    id: "4",
    nombre: "Campania Abril",
    fechaCreacion: new Date("2024-04-02T10:15:00").toISOString(),
    fechaInicio: new Date("2024-04-15T12:00:00").toISOString(),
    grabarLlamados: false,
    estado: "En Espera",
    personas: [
      { id: "p4", nombre: "Laura", apellido: "Ramírez", telefono: "1122334455" }
    ]
  },
  {
    id: "5",
    nombre: "Campania Mayo",
    fechaCreacion: new Date("2024-05-03T09:00:00").toISOString(),
    fechaInicio: new Date("2024-05-12T08:30:00").toISOString(),
    grabarLlamados: true,
    estado: "Activa",
    personas: [
      { id: "p5", nombre: "Pedro", apellido: "López", telefono: "2233445566" }
    ]
  },
  {
    id: "6",
    nombre: "Campania Junio",
    fechaCreacion: new Date("2024-06-04T08:45:00").toISOString(),
    fechaInicio: new Date("2024-06-18T14:00:00").toISOString(),
    grabarLlamados: false,
    estado: "Finalizada",
    personas: [
      { id: "p6", nombre: "Ana", apellido: "Martínez", telefono: "3344556677" }
    ]
  }
];
