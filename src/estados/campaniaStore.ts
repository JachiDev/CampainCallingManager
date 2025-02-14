import { create } from "zustand";
import { mockCampanias } from "../utils/mockData";

type EstadoCampania = "En Espera" | "Activa" | "Finalizada";

interface Persona {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
}

export interface Campania {
  id: string;
  nombre: string;
  fechaCreacion: string;
  fechaInicio: string;
  grabarLlamados: boolean; 
  estado: EstadoCampania;
  personas: Persona[];
}

interface Store {
  campanias: Campania[];
  agregarCampania: (campania: Campania) => void;
  agregarPersona: (idCampania: string, persona: Persona) => void;
  cambiarEstadoCampania: (idCampania: string, nuevoEstado: EstadoCampania) => void;
  eliminarCampania: (idCampania: string) => void;
  inicializarDatos: () => void;
  puedeEditarCampania: (idCampania: string) => boolean;
}

export const useCampaniasStore = create<Store>()(
  (set, get) => ({
    campanias: JSON.parse(localStorage.getItem("campanias") || "[]"),
    
    agregarCampania: (campania) =>
      set((state) => {
          const newState = { campanias: [...state.campanias, campania] };
          localStorage.setItem("campanias", JSON.stringify(newState.campanias));
          return { campanias: [...newState.campanias] };
      }),

    agregarPersona: (idCampania, persona) =>
      set((state) => ({
        campanias: state.campanias.map((campania) =>
          campania.id === idCampania
            ? { ...campania, personas: [...campania.personas, persona] }
            : campania
        ),
      })),

      cambiarEstadoCampania: (idCampania, nuevoEstado) =>
        set((state) => {
          const nuevasCampanias = state.campanias.map((campania) =>
            campania.id === idCampania ? { ...campania, estado: nuevoEstado } : campania
          );
      
          localStorage.setItem("campanias", JSON.stringify(nuevasCampanias));
          return { campanias: nuevasCampanias };
        }),      

      eliminarCampania: (idCampania) =>
        set((state) => {
            const nuevasCampanias = state.campanias.filter((campania) => campania.id !== idCampania);
            localStorage.setItem("campanias", JSON.stringify(nuevasCampanias));
            return { campanias: [...nuevasCampanias] };
        }),
        

        inicializarDatos: () => {
          let storedCampanias = JSON.parse(localStorage.getItem("campanias") || "[]");
      
          if (storedCampanias.length === 0) {
              storedCampanias = mockCampanias;
              localStorage.setItem("campanias", JSON.stringify(mockCampanias));
          }
      
          const ahora = new Date();
          storedCampanias = storedCampanias.map((campania: { fechaInicio: string | number | Date; estado: string; }) => {
              const fechaInicio = new Date(campania.fechaInicio);
              if (campania.estado === "En Espera" && fechaInicio <= ahora) {
                  return { ...campania, estado: "Activa" };
              }
              return campania;
          });
      
          localStorage.setItem("campanias", JSON.stringify(storedCampanias));
          set({ campanias: storedCampanias });
      },

      puedeEditarCampania: (idCampania) => {
        const campania = get().campanias.find((c) => c.id === idCampania);
        return campania?.estado !== "Finalizada";
      }
  })
);
