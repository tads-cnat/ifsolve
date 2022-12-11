import axios from "axios";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../providers/context";

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});
