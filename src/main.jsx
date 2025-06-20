import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AdicionarProdutos from "./pages/AdicionarProdutos.jsx";
import CadastroPessoa from "./pages/CadastroPessoa.jsx";

const rotas = createBrowserRouter([
  
  {path:"/", element: <Home/>},
  {path:"/Login", element: <Login/>}
  {path:"/", element: <Home/>},
  {path:"/adicionar", element: <AdicionarProdutos/>}

])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>
);
