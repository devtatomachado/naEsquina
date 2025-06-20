import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AdicionarProdutos from "./pages/AdicionarProdutos.jsx";
import CadastroPessoa from "./pages/CadastroPessoa.jsx";
<<<<<<< HEAD
import CadastroComerciante from "./pages/CadastroComerciante.jsx";
=======
import Loja from "./pages/Loja.jsx";
>>>>>>> 07872fb3399676a7d145dc9c9d9bea981a30e46e

const rotas = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <CadastroPessoa /> },
  { path: "/comerciante", element: <CadastroComerciante /> },
  { path: "/adicionar", element: <AdicionarProdutos /> },
  {path: "/loja/:lojaID", element: <Loja/>}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>
);
