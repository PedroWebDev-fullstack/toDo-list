import { useState } from "react"
import FormularioCadastro from "../components/FormularioCadastro"
import FormularioLogin from "../components/FormularioLogin"

export default function Auth() {
    const [loginFormAtivo, setMostrarLogin] = useState(false)
    const [CadastroFormAtivo, setMostrarCadastro] = useState(true)

    function mostrarCadastro() {
        setMostrarCadastro(true)
        setMostrarLogin(false)
    }

    function mostrarLogin() {
        setMostrarLogin(true)
        setMostrarCadastro(false)
    }

    return (
        <>
            <FormularioCadastro className={`container ${CadastroFormAtivo ? "ativo" : ""}`} ativarLogin={mostrarLogin}/>
            <FormularioLogin className={`container ${loginFormAtivo ? "ativo" : ""}`} ativarCadastro={mostrarCadastro}/>
        </>
    )
}