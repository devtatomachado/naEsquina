import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AdicionarProdutos from "./pages/AdicionarProdutos.jsx";
import Loja from "./pages/Loja.jsx";
import TesteCadastro from "./pages/TesteCadastro.jsx";
import Pesquisar from "./pages/Pesquisar.jsx";
import EditarLoja from "./pages/EditarLoja.jsx";
import EditarProduto from "./pages/EditarProduto.jsx";

const rotas = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <TesteCadastro /> },
  { path: "/adicionar", element: <AdicionarProdutos /> },
  { path: "/loja/:lojaID", element: <Loja /> },
  { path: "/pesquisar", element: <Pesquisar /> },
  { path: "/editarloja", element: <EditarLoja /> },
  { path: "/editarproduto", element: <EditarProduto /> }

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>
);
