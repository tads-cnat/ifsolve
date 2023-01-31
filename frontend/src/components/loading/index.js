import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
    return (
        <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center gap-4">
            <div className="animate-spin text-4xl text-primary-100">
                <AiOutlineLoading3Quarters />
            </div>
            <p className="text-lg text-dark-100 font-medium">Carregando...</p>
        </div>
    )
}