export const formatDate = (isoString: string): string => {
    if (!isoString) return "Fecha no disponible";
  
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).format(date);
  };  