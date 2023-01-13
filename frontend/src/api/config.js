import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8000/',
});

export function loginApi(data) {
    return api.post("auth/login/", {
        "username": data.login,
        "password": data.password,
    })
}

export function ElaboradorRegister(data) {
    return api.post("elaborador/cadastro/", {
        "nome_completo": data.nome_completo,
        "username": data.username,
        "password": data.password,
        "first_name": "string",
        "last_name": "string",
        "email": data.email,
        "data_nascimento": data.data_nascimento,
        "verificado": true
    })
}

export function AlunoRegister(data) {
    return api.post("aluno/cadastro/", {
        "nome_completo": data.nome_completo,
        "username": data.username,
        "password": data.password,
        "first_name": "string",
        "last_name": "string",
        "email": data.email,
        "data_nascimento": data.data_nascimento,
    })
}

export function PostItemDI(data) {
    console.log(data);
    const user = JSON.parse(localStorage.getItem("ifsolve_user"));

    return api.post("item/elaborador/criar/",
        {
            "titulo": data.titulo,
            "texto_base": "",
            "tipo": data.tipo,
            "assunto": data.assunto,
            "tags": data.tags,
            "expectativa_resposta": data.expectativa_resposta,
            "elaborador": user.id,
            "enunciado": data.enunciado,
            "area": data.area,
            "visibilidade": "PU",
            "data_publicacao": new Date().toJSON(),
        },
        {
            headers: {
                "Authorization": "Token " + localStorage.getItem("ifsolve_token"),
            }
        }
    ).then((res) => {
        console.log(res)
    })
}

export function PostItemME(data) {
    const user = JSON.parse(localStorage.getItem("ifsolve_user"));

    return api.post("item/elaborador/criar/",
        {
            "titulo": data.titulo,
            "texto_base": "",
            "tipo": data.tipo,
            "assunto": data.assunto,
            "tags": data.tags,
            "alternativa_correta": data.alternativa_correta,
            "elaborador": user.id,
            "enunciado": data.enunciado,
            "area": data.area,
            "visibilidade": "PU",
            "data_publicacao": new Date().toJSON(),
            "alternativa_a": {
                "texto": data.alternativas[0].texto,
                "justificativa": data.alternativas[0].justificativa,
            },
            "alternativa_b": {
                "texto": data.alternativas[1].texto,
                "justificativa": data.alternativas[1].justificativa,
            },
            "alternativa_c": {
                "texto": data.alternativas[2] ? data.alternativas[2].texto : " ",
                "justificativa": data.alternativas[2] ? data.alternativas[2].justificativa : " ",
            },
            "alternativa_d": {
                "texto": data.alternativas[3] === undefined ? " " : data.alternativas[3].texto,
                "justificativa": data.alternativas[3] === undefined ? " " : data.alternativas[3].justificativa,
            }
        },
        {
            headers: {
                "Authorization": "Token " + localStorage.getItem("ifsolve_token"),
            }
        }
    ).then((res) => {
        console.log(res)
    })
}


export function GetItems(setItens, setListItens) {
    const token = localStorage.getItem("ifsolve_token");
    api.get("item/elaborador/",
        {
            headers: {
                "Authorization": "Token " + token,
            }
        },
    ).then((res) => {
        setItens([...res.data].reverse());
        setListItens([...res.data].reverse());
    })
}

export function Logout() {
    const token = localStorage.getItem("ifsolve_token");

    return api.get("auth/logout/",
        {
            headers: {
                "Authorization": "Token " + token,
            }
        }
    ).then((res) => {
        localStorage.removeItem("ifsolve_token");
        localStorage.removeItem("ifsolve_user");
    })

}

export function GetAreas() {
    const token = localStorage.getItem("ifsolve_token");

    return api.get("area/",
        {
            headers: {
                "Authorization": "Token " + token,
            }
        }
    )
}

export function GetItemByID(id) {
    const token = localStorage.getItem("ifsolve_token");

    return api.get(`item/${id}/`, {
        headers: {
            "Authorization": "Token " + token,
        }
    })
}