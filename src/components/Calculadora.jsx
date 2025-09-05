import React, { useState } from "react";
import "../css/Calculadora.css";

export default function Calculadora() {
  const [display, setDisplay] = useState("0");
  const [valorAnterior, setValorAnterior] = useState(null);
  const [operacao, setOperacao] = useState(null);
  const [aguardandoSegundoOperando, setAguardandoSegundoOperando] = useState(false);

  const toNumber = (txt) => parseFloat((txt || "0").replace(",", "."));
  const toText = (num) => {
    if (Number.isNaN(num)) return "Erro";
    const txt = num.toString().replace(".", ",");
    return txt;
  };

  const adicionarNumero = (num) => {
    if (display === "Erro") {
      if (num === ",") {
        setDisplay("0,");
      } else {
        setDisplay(num);
      }
      setAguardandoSegundoOperando(false);
      return;
    }

    if (aguardandoSegundoOperando) {
      if (num === ",") setDisplay("0,");
      else setDisplay(num);
      setAguardandoSegundoOperando(false);
      return;
    }

    if (num === ",") {
      if (display.includes(",")) return;
      setDisplay(display + ",");
      return;
    }

    if (display === "0") setDisplay(num);
    else setDisplay(display + num);
  };

  const escolherOperacao = (op) => {
    if (operacao && !aguardandoSegundoOperando && valorAnterior !== null) {
      calcularResultado();
      setOperacao(op);
      setValorAnterior(display);
      setAguardandoSegundoOperando(true);
      return;
    }

    setValorAnterior(display);
    setOperacao(op);
    setAguardandoSegundoOperando(true);
  };

  const calcularResultado = () => {
    if (valorAnterior === null || operacao === null) return;

    const num1 = toNumber(valorAnterior);
    const num2 = toNumber(display);
    let resultado;

    switch (operacao) {
      case "+": resultado = num1 + num2; break;
      case "-": resultado = num1 - num2; break;
      case "*": resultado = num1 * num2; break;
      case "/": resultado = num2 !== 0 ? num1 / num2 : NaN; break;
      default: return;
    }

    const texto = toText(resultado);
    setDisplay(texto);
    if (texto === "Erro") {
      setValorAnterior(null);
      setOperacao(null);
      setAguardandoSegundoOperando(false);
      return;
    }

    setValorAnterior(texto);
    setOperacao(null);
    setAguardandoSegundoOperando(true);
  };

  const limpar = () => {
    setDisplay("0");
    setValorAnterior(null);
    setOperacao(null);
    setAguardandoSegundoOperando(false);
  };

  const backspace = () => {
    if (display === "Erro") {
      setDisplay("0");
      setAguardandoSegundoOperando(false);
      return;
    }
    if (aguardandoSegundoOperando) return;
    if (display.length <= 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
      return;
    }
    let novo = display.slice(0, -1);
    if (novo.endsWith(",")) novo = novo.slice(0, -1);
    if (novo === "" || novo === "-") novo = "0";
    setDisplay(novo);
  };

  const toggleSinal = () => {
    if (display === "Erro") return;
    if (aguardandoSegundoOperando) {
      setDisplay("-0");
      setAguardandoSegundoOperando(false);
      return;
    }
    if (display === "0" || display === "0,") {
      setDisplay("-0");
      return;
    }
    if (display.startsWith("-")) setDisplay(display.slice(1));
    else setDisplay("-" + display);
  };

  const porcentagem = () => {
    if (display === "Erro") return;

    if (operacao && valorAnterior !== null) {
      const base = toNumber(valorAnterior);
      const pct = toNumber(display) / 100;
      const valor = base * pct;
      const txt = toText(valor);
      setDisplay(txt);
      setAguardandoSegundoOperando(false);
      return;
    }

    const valor = toNumber(display) / 100;
    setDisplay(toText(valor));
    setAguardandoSegundoOperando(false);
  };

  return (
    <section>
      <div className="numeros">
        <div>
          <h1 className="resultado">{display}</h1>

          <div>
            <button onClick={limpar}>C</button>
            <button onClick={backspace}>⌫</button>
            <button onClick={porcentagem}>%</button>
            <button onClick={() => escolherOperacao("/")}>/</button>
          </div>
          <div>
            <button onClick={() => adicionarNumero("7")}>7</button>
            <button onClick={() => adicionarNumero("8")}>8</button>
            <button onClick={() => adicionarNumero("9")}>9</button>
            <button onClick={() => escolherOperacao("*")}>*</button>
          </div>
          <div>
            <button onClick={() => adicionarNumero("4")}>4</button>
            <button onClick={() => adicionarNumero("5")}>5</button>
            <button onClick={() => adicionarNumero("6")}>6</button>
            <button onClick={() => escolherOperacao("-")}>-</button>
          </div>
          <div>
            <button onClick={() => adicionarNumero("1")}>1</button>
            <button onClick={() => adicionarNumero("2")}>2</button>
            <button onClick={() => adicionarNumero("3")}>3</button>
            <button onClick={() => escolherOperacao("+")}>+</button>
          </div>
          <div>
            <button onClick={toggleSinal}>±</button>
            <button onClick={() => adicionarNumero("0")}>0</button>
            <button onClick={() => adicionarNumero(",")}>,</button>
            <button onClick={calcularResultado}>=</button>
          </div>
        </div>
      </div>
    </section>
  );
}
