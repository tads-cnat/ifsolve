// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import { FiArrowLeft } from "react-icons/fi";
// import ReactQuill from "react-quill";
// import { useNavigate, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
// import {
//     AnswerAvaliacao,
//     GetAvaliacaoRespostasByAluno,
//     GetAvaliacaoByID,
//     GetItemByID,
// } from "../../api/config";

export default function ResponderAvaliacao() {
    const { id } = useParams();

    return <h1>ResponderAvaliação {id}</h1>;
}
