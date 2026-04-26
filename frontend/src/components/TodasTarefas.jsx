import { useEffect, useState } from "react"
import { mostrarTarefas, editarConclusao, deletarTarefa } from "../services/tarefas.api"
import excluirIcone from "../assets/excluir.png"


export default function TodasTarefas({ enviarDados, filtradas }) {

    const [tarefas, setTarefas] = useState([]);

    async function excluirTarefa(id) {
        await deletarTarefa(id);
        
        setTarefas(item => item.filter(tarefa => tarefa.id !== id))
    }

    function concluirTarefa(e, id) {
        const feita = e.target.checked
        editarConclusao(id, feita)

        setTarefas(tarefas => tarefas.map(tarefa => tarefa.id === id ? { ...tarefa, estaFeita: feita } : tarefa ))
    }

    useEffect(()=> {
        async function coletarTarefas() {
            const dados = await mostrarTarefas();
            setTarefas(Array.isArray(dados) ? dados : []);
        }

        coletarTarefas();
    }, []);

    useEffect(() => {
        enviarDados(tarefas)
    }, [tarefas])

    return (
        <div className="lista-tarefas">
            {filtradas?.map(item => (
                <div key={item.id} className="tarefa-item">
                    <div className="item-content">
                        <input type="checkbox" checked={item.estaFeita} onChange={(e) => concluirTarefa(e, item.id)} />
                        <p>{item.descricao}</p>
                    </div>
                    <div className="excluir-icone" onClick={() => excluirTarefa(item.id)}>
                        <img src={excluirIcone} alt=""/>
                    </div>
                </div>
            ))}
        </div>
    )
}