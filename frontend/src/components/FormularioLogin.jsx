import { logarUsuario } from "../services/usuarios.api.js"
import { estaLogado  } from "../services/usuarios.api.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "./Logo.jsx"
import iconeEmail from "../assets/email.png"
import iconeSenha from "../assets/senha.png"

export default function FormularioLogin({ ativarCadastro, className }) {
    const navegadorDePastas =  useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    
    async function logar(e) {
        e.preventDefault();
        const resp = await logarUsuario(email, senha);
        if (resp.erro) {
            setErro(resp.erro);
            return;
        }

        const logado = await estaLogado();

        if (!logado.erro) {
            navegadorDePastas("/home")
        }
    };

    return (
        <div className={className}>
            <div className="introducao">
                <Logo />
                <h1>Bem-vindo</h1>
                <p className="text-align-center paragrafo-1">Faça login para acessar suas tarefas</p>
            </div>
            <form className="formularios" onSubmit={logar}>
                <div className="form-head">
                    <h1>Login</h1>
                    <p className="paragrafo-1">Entre com seu email e senha para continuar</p>
                </div>
                <div className="form-body">
                    <label>
                        <p className="paragrafo-08">Email</p>
                        <div className="form-input">
                            <img src={iconeEmail} alt="icone de carta" />
                            <input type="text" required placeholder="exemplo@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </label>
                    <label>
                        <p className="paragrafo-08">Senha</p>
                        <div className="form-input">
                            <img src={iconeSenha} alt="icone de cadeado" />
                            <input type="password" required placeholder="••••••••" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                    </label>
                    <button type="submit"className="botao botao-primario">Fazer Login</button>
                    {erro && <p className="erro text-align-center"><strong>{erro}</strong></p>}
                </div>
                <p className="redirect-text paragrafo-1">Não tem uma conta? <span className="redirect cadastro-redirect" onClick={ativarCadastro}><strong>Cadastre-se</strong></span></p>
            </form>
            <p className="text-align-center paragrafo-08">Organize suas tarefas de forma simples e eficiente</p>
        </div>
    )
}