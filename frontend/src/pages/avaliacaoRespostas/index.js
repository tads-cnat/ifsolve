export default function AvaliacaoRespostas() {
    return (
        <div className="bg-dark-5 min-h-screen flex flex-col items-center">
            <div className="container" style={{ maxWidth: "720px" }}>
                <h1>Respostas</h1>
                <GroupContent>

                </GroupContent>
            </div>
        </div>
    )
}

function GroupContent(props){
    return(
        <div className="">{props.children}</div>
    )
}