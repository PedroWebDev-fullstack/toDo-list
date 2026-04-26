    import Logo from "../components/Logo.jsx";
    import FormularioAdicionar from "../components/AdicionarTarefa.jsx";
    import TodasTarefas from "../components/TodasTarefas.jsx";
    import adicionar from "../assets/adicionar.png";
    import logoutIcon from "../assets/logout.png";
    import { logout, estaLogado } from "../services/usuarios.api.js";
    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom"

    export default function Home() {
        const navegadorDePastas =  useNavigate();

        const [tarefas, setTarefas] = useState([]);
        const [tarefaspendente, setTarefaPendente] = useState(0)
        const [tarefasConcluidas, setTarefasConcluidas] = useState(0)
        const [tarefasFiltradas, setTarefasFiltradas] = useState([]);

        function filtrarTarefas(filtro) {
            switch (filtro) {
                case "todas":
                    setTarefasFiltradas(tarefas)
                    break;
                case "concluidas":
                    setTarefasFiltradas(tarefas.filter(tarefa => tarefa.estaFeita))
                    break;
                case "pendentes":
                    setTarefasFiltradas(tarefas.filter(tarefa => !tarefa.estaFeita))
                    break;
            }
        }
        
        function definirStatusTarefas(tarefas) {
            if (!Array.isArray(tarefas)) return;

            const pendentes = tarefas.filter(t => !t.estaFeita).length;
            const feitas = tarefas.filter(t => t.estaFeita).length;

            setTarefaPendente(pendentes);
            setTarefasConcluidas(feitas);
        }
        
        async function validarSessao() {
            const resp = await estaLogado();
            if (resp.erro) {
                navegadorDePastas("/")
            }
        }

        function receberDados(dados) {
            setTarefas(dados)
        }

        useEffect(()=> {
            validarSessao();
        });
        
        useEffect(() => {
            definirStatusTarefas(tarefas)
        }, [tarefas])
        
        useEffect(() => {
            setTarefasFiltradas(tarefas)
        }, [tarefas])

        async function deslogar() {
            await logout();
            navegadorDePastas("/");
        }

        const [adicionarTarefa, setAdicionarTarefa] = useState(false)

        function mostrar() {
            if (adicionarTarefa) {
                setAdicionarTarefa(false)
            }else {
                setAdicionarTarefa(true)
            }
        }   

        function mensagemSemTarefas() {
            if (tarefas.length === 0) {
                return (
                    <div className="tarefas">
                        <p>Nenhuma tarefa encontrada</p>
                    </div>
                )
            }
        }

        return (
            <>
                <div className="container ativo">
                    <div className="introducao home-introducao">
                        <Logo />
                        <h1>To-Do List</h1>
                        <p className="text-align-center paragrafo-1">Gerencie suas tarefas de forma simples e organizada</p>
                    </div>
                    <div className="tarefas-container">
                        <div className="tarefas-head">
                            <div className="tarefa-head-item-1">
                                <span>Minhas Tarefas</span>
                                <p>{tarefas.length === 0 ? "Nenhuma tarefa adicionada" : tarefaspendente ? `${tarefaspendente} tarefas pendentes` : "Todas as tarefas concluídas! 🎉"}</p>
                            </div>
                            <div className="tarefa-head-item-2">
                                <button className="botao botao-primario adicionar" onClick={mostrar}><img src={adicionar} alt=""/> Adicionar Tarefa</button>
                                <button className="botao botao-secundario logout" onClick={deslogar}><img src={logoutIcon} alt="" /></button>
                            </div>
                        </div>
                        <div className="tarefa-filtrar">
                            <button className="botao botao-secundario filtrar-item" onClick={() => filtrarTarefas("todas")}>Todas <span>({tarefaspendente + tarefasConcluidas})</span></button>
                            <button className="botao botao-secundario filtrar-item" onClick={() => filtrarTarefas("concluidas")}>Concluidas <span>({tarefasConcluidas})</span></button>
                            <button className="botao botao-secundario filtrar-item" onClick={() => filtrarTarefas("pendentes")}>Pendentes <span>({tarefaspendente})</span></button>
                        </div>
                        {mensagemSemTarefas()}
                        <TodasTarefas enviarDados={receberDados} filtradas={tarefasFiltradas} />
                    </div>
                    <p>Organize, priorize e conquiste suas metas diárias</p>

                    <FormularioAdicionar mostrar={adicionarTarefa} fechar={mostrar} />
                </div>
            </>
        )
    }