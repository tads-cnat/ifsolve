import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { GetItemByID } from "../../api/config";
import { Container } from "../../components";

export default function ResponderItem(props) {
    const { id } = useParams();
    const [getData, setData] = useState([]);

    useEffect(() => {
        GetItemByID(id).then(res => {
            console.log(res.data);
            setData(res.data)
        })
    }, [id])

    const modules = {
        toolbar: false
    }


    return (
        <div className="min-h-screen bg-dark-5 py-5">
            <Container className="">
                <div className="flex flex-col gap-4 mx-auto bg-white px-8 py-4 rounded-lg mb-4" style={{ maxWidth: "720px" }}>
                    <h1 className="text-3xl font-medium">{getData.titulo}</h1>
                    <ReactQuill className="border-0 mb-4 text-lg font-medium" modules={modules} value={getData.enunciado} readOnly={true}></ReactQuill>
                </div>
                <div className="flex flex-col gap-4 mx-auto bg-white px-8 py-4 rounded-lg mb-4" style={{ maxWidth: "720px" }}>

                </div>
            </Container>

        </div>
    )
}