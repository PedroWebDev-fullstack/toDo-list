import { useState } from "react"
import { adicionarTarefa } from "../services/tarefas.api"

export default function AdicionarTarefa({ mostrar, fechar }) {
    const [descricaoTarefa, setDescricaoTarefa] = useState("")
    const estaFeita = false;

    async function enviarTarefa() {
        window.location.reload();

        await adicionarTarefa(descricaoTarefa, estaFeita);
    };


    
    return (
        <div className={`overlay ${mostrar ? "ativo" : ""}`} onClick={fechar}>
            <form className="form-adicionar-tarefa" onSubmit={enviarTarefa} onClick={(e) => e.stopPropagation()}>
                <div>
                    <h1>Nova Tarefa</h1>
                    <p className="paragrafo-085">Adicione uma nova tarefa à sua lista. Clique em salvar quando terminar.</p>
                </div>
                <label>
                    <p className="paragrafo-085">Tarefa</p>
                    <input type="text" placeholder="Digite sua tarefa..." value={descricaoTarefa} onChange={(e) => setDescricaoTarefa(e.target.value)} required/>
                </label>
                <div className="form-adicionar-botoes">
                    <button className="botao botao-secundario fechar-formulario" type="button" onClick={fechar}>Cancelar</button>
                    <button className="botao botao-primario salvar-tarefa" type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
}