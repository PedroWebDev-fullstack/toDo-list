const BASE_URL = "http://localhost:3010/tarefas";

async function mostrarTarefas() {
    const resp = await fetch(BASE_URL, {
        credentials: "include"
    });

    const dados = await resp.json();

    if (!Array.isArray(dados)) {
        return [];
    }

    return dados;
}

async function adicionarTarefa(descricao, estaFeita) {
    const resp = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
            descricao, estaFeita
        }) 
    });
    return await resp.json();
}

async function editarConclusao(id, estaFeita) {
    const resp = await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
            id, estaFeita
        }) 
    });
    return await resp.json();
}

async function filtrarTarefas() {
    const resp = await fetch(`${BASE_URL}/filtrar`, {
        credentials: "include"
    });
    return await resp.json();
}

async function deletarTarefa(id) {
    const resp = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        credentials: "include"
    })

    return await resp.json();
}

export { mostrarTarefas, adicionarTarefa, editarConclusao, filtrarTarefas, deletarTarefa }