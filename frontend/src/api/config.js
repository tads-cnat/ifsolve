import axios from "axios";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../providers/context";
import { format } from "date-fns";



export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});


export function criarItemApi(data, access) {
    console.log(data.alternativas[4]);
    api.post("item/elaborador/criar/",
        {
            "titulo": data.titulo,
            "texto_base": data.texto_base,
            "tipo": data.tipo,
            "assunto": data.assunto,
            "tags": data.tags,
            "expectativa_resposta": "",
            "alternativa_correta": data.alternativa_correta,
            "elaborador": 1,
            "enunciado": "string",
            "area": 1,
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
                "texto": data.alternativas[3] == undefined ? " " : data.alternativas[3].texto,
                "justificativa": data.alternativas[3] == undefined ? " " : data.alternativas[3].justificativa,
            }
        },
        {
            headers: {
                "Authorization": "Token " + access,
            }
        }
    ).then((res) => {
        console.log(res)
    })

    // api.post("item/elaborador/criar/",
    //     {
    //         // "tipo": "DI",
    //         // "data_publicacao": new Date().toLocaleString(),
    //         // "tags": [data.tags],
    //         // "visibilidade": data.visibilidade,
    //         // "assunto": data.assunto,
    //         // "titulo": data.titulo,
    //         // "texto_base": data.texto_base,
    //         // "enunciado": data.enunciado,
    //         // "expectativa_resposta": data.expectativa_resposta,
    //         // "alternativa_correta": data.alternativa_correta,
    //         // "elaborador": 1,
    //         // "area": 0,

    //         "data_publicacao": new Date().toJSON(),
    //         "tags": [
    //             {
    //                 "nome": "tag"
    //             }
    //         ],
    //         "tipo": "DI",
    //         "visibilidade": "PU",
    //         "assunto": "string",
    //         "titulo": "string",
    //         "texto_base": "string",
    //         "enunciado": "string",
    //         "expectativa_resposta": "string",
    //         "alternativa_correta": "s",
    //         "elaborador": 1,
    //         "area": 1
    //     },
    //     {
    //         headers: {
    //             "Authorization": "Token 4ea16f5674b6d54d8101110e0bd209da02022cc0",
    //         }
    //     }
    // ).then((res) => {
    //     console.log(res)
    // })
}