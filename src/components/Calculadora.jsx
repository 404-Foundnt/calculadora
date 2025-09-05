import React, { useState } from "react";
import "../css/Calculadora.css";

export default function Calculadora() {
    const [display, setDisplay] = useState("0");
    const [valorAnterior, setValorAnterior] = useState(null);
    const [operacao, setOperacao] = useState(null);

    // Adicionar números ao display
    const adicionarNumero = (num) => {
        if (display === "0" && num !== ",") {
            setDisplay(num);
        } else if (num === "," && display.includes(",")) {
            return; // não adiciona mais de uma vírgula
        } else {
            setDisplay(display + num);
        }
    };

    // Escolher operação
    const escolherOperacao = (op) => {
        if (operacao && valorAnterior !== null) {
            calcularResultado(); // calcula antes se já tiver uma operação pendente
        }
        setValorAnterior(display);
        setDisplay("0");
        setOperacao(op);
    };

    // Calcular resultado
    const calcularResultado = () => {
        if (valorAnterior === null || operacao === null) return;

        const num1 = parseFloat(valorAnterior.replace(",", "."));
        const num2 = parseFloat(display.replace(",", "."));
        let resultado;

        switch (operacao) {
            case "+": resultado = num1 + num2; break;
            case "-": resultado = num1 - num2; break;
            case "*": resultado = num1 * num2; break;
            case "/": resultado = num2 !== 0 ? num1 / num2 : "Erro"; break;
            default: return;
        }

        setDisplay(resultado.toString().replace(".", ","));
        setValorAnterior(null);
        setOperacao(null);
    };

    // Limpar display
    const limpar = () => {
        setDisplay("0");
        setValorAnterior(null);
        setOperacao(null);
    };

    return (
        <section>
            <div className="numeros">
                <div>
                    <h1 className="resultado">{display}</h1>

                    <div>
                        <button onClick={() => adicionarNumero("7")}>7</button>
                        <button onClick={() => adicionarNumero("8")}>8</button>
                        <button onClick={() => adicionarNumero("9")}>9</button>
                        <button onClick={() => escolherOperacao("/")}>/</button>
                    </div>
                    <div>
                        <button onClick={() => adicionarNumero("4")}>4</button>
                        <button onClick={() => adicionarNumero("5")}>5</button>
                        <button onClick={() => adicionarNumero("6")}>6</button>
                        <button onClick={() => escolherOperacao("*")}>*</button>
                    </div>
                    <div>
                        <button onClick={() => adicionarNumero("1")}>1</button>
                        <button onClick={() => adicionarNumero("2")}>2</button>
                        <button onClick={() => adicionarNumero("3")}>3</button>
                        <button onClick={() => escolherOperacao("-")}>-</button>
                    </div>
                    <div>
                        <button onClick={() => adicionarNumero("0")}>0</button>
                        <button onClick={() => adicionarNumero(",")}> , </button>
                        <button onClick={calcularResultado}>=</button>
                        <button onClick={() => escolherOperacao("+")}>+</button>
                    </div>
                    <div>
                        <button onClick={limpar}>C</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
