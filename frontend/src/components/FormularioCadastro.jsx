import { cadastrarUsuario, logarUsuario } from "../services/usuarios.api.js"
import { useState } from "react"
import Logo from "./Logo.jsx"
import iconeNome from "../assets/nome.png"
import iconeEmail from "../assets/email.png"
import iconeSenha from "../assets/senha.png"
import { useNavigate } from "react-router-dom"

export default function FormularioCadastro({ ativarLogin, className }) {

    const navegadorDePastas = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const senhaIguais = senha === confirmarSenha;

    // if (senha > 0 && senha <= 8) {
    //         console.log('oi')
    //     }

    async function logar() {

        const resp = await logarUsuario(email, senha);
        if (resp.sucesso) {
            navegadorDePastas("/home")
        } else {
            setErro(resp.erro || "Erro ao logar");
        }

    };

    async function cadastrar(e) {
        e.preventDefault();

        if (senhaIguais) {
            await cadastrarUsuario(nome, email, senha);
            await logar(email, senha);
        }else {
            setErro("Senha incorreta");
        }
    };

    return (
        <div className={className}>
            <div className="introducao">
                <Logo />
                <h1 className="text-align-center">Criar Conta</h1>
                <p className="text-align-center paragrafo-1">Comece a organizar suas tarefas hoje</p>
            </div>
            <form className="formularios" onSubmit={cadastrar}>
                <div className="form-head">
                    <h1>Cadastro</h1>
                    <p className="paragrafo-1">Preencha os dados abaixo para criar sua conta</p>
                </div>
                <div className="form-body">
                    <label>
                        <p className="paragrafo-08">Nome</p>
                        <div className="form-input">
                            <img src={iconeNome} alt="icone de usuario"></img>
                            <input type="text" required placeholder="Seu Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)}/>
                        </div>
                    </label>
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
                    <label>
                        <p className="paragrafo-08">Confirmar Senha</p>
                        <div className="form-input">
                            <img src={iconeSenha} alt="icone de cadeado" />
                            <input type="password" required placeholder="••••••••" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                        </div>
                    </label>
                    <button type="submit" disabled={!senhaIguais} className="botao botao-primario">Criar Conta</button>
                    <p>{erro}</p>
                </div>
                <p  className="redirect-text paragrafo-1">Já tem uma conta? <span className="redirect login-redirect" onClick={ativarLogin}><strong>Fazer Login</strong></span></p>
            </form>
            <p className="text-align-center paragrafo-08">Organize suas tarefas de forma simples e eficiente</p>
        </div>
    )
}