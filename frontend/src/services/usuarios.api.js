const BASE_URL = "http://localhost:3010/usuarios";

async function cadastrarUsuario(nome, email, senha) {
    const resp = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
            nome, email, senha
        })
        }
    );
    
    await logarUsuario(email, senha)
    return await resp.json();
}

async function logarUsuario(email, senha) {
    const resp = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
            email, senha
        })
        }
    )
    return await resp.json();
}

async function estaLogado() {
    const resp = await fetch(`${BASE_URL}/perfil`, {
        credentials: "include"
    });
    return await resp.json();
}

async function logout() {
    const resp = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include"
    });
    return await resp.json();
}

export { cadastrarUsuario, logarUsuario, estaLogado, logout }