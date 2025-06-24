import React, { useState } from "react";
import CadastroPessoa from "../pages/CadastroPessoa";
import CadastroComerciante from "../pages/CadastroComerciante";

const RadioButton = () => {
  const [telaAtiva, setTelaAtiva] = useState("comerciante");

  const handleChangeTela = (event) => {
    setTelaAtiva(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="pessoa"
          checked={telaAtiva === "pessoa"}
          onChange={handleChangeTela}
        />
        Consumidor
      </label>
      <label>
        <input
          type="radio"
          value="comerciante"
          checked={telaAtiva === "comerciante"}
          onChange={handleChangeTela}
        />
        Comerciante
      </label>

      {telaAtiva === "pessoa" ? <CadastroPessoa /> : <CadastroComerciante />}
    </div>
  );
};

export default RadioButton;
