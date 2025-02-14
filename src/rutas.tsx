import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Campanias from "./paginas/campañas";
import Home from "./paginas/home";
import Disenio from "./componentes/Disenio";



const AppRutas = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Cargando...</div>}>
                <Routes>
                    <Route element={<Disenio />}>
                        <Route path="/" element={<Home />}/>
                        <Route path="/campanias" element={<Campanias />}/>
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRutas;