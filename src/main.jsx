import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AdicionarProdutos from "./pages/AdicionarProdutos.jsx";
import CadastroPessoa from "./pages/CadastroPessoa.jsx";
import CadastroComerciante from "./pages/CadastroComerciante.jsx"
import Loja from "./pages/Loja.jsx";
import Pesquisar from "./pages/Pesquisar.jsx";

const rotas = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <CadastroPessoa /> },
  { path: "/comerciante", element: <CadastroComerciante /> },
  { path: "/adicionar", element: <AdicionarProdutos /> },
  { path: "/loja/:lojaID", element: <Loja /> },
  { path: "/pesquisar", element: <Pesquisar/>}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>
);
