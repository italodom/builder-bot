import React, {useState} from "react";
import json from './chat.json'

import {Container} from './style'
import {GlobalStyle} from "./GlobalStyle";
import EditJson from "./EditJson";

function App() {
    const [objJson, setObjJson] = useState(json);
    const [editar, setEditar] = useState(false);
    const [mensagens, setMensagens] = useState([]);
    const timeInterval = 1400;

    const throttledProcess = (items, interval) => {
        if (items.length === 0) {
            console.log('ALL DONE')
            return
        }
        setRespostas(items[0], items)
        setMensagens(prev => [...prev, {mensagem: items[0].mensagem}])
        console.log('PROCESSING', items[0], Date())
        setTimeout(() => throttledProcess(items.slice(1), interval), interval)
    }

    const onResponder = (item) => {
        document.querySelectorAll('.btn-resposta').forEach((a) => a.disabled = true)
        if (!item?.sequenciaMensagem) {
            throttledProcess([{mensagem: 'FIM'}], timeInterval)
        } else {
            throttledProcess([{
                mensagem: <div className="resposta">{item.mensagem}</div>
            }, ...item.sequenciaMensagem], timeInterval)
        }
    }

    const setRespostas = (item, items) => {
        if (item.evento === 'pergunta') {
            const botoes = item.opcoesRespostas.map((m, k) => {
                return <button className={`btn-resposta`} key={k}
                               onClick={() => onResponder(m)}>{m.mensagem}</button>
            })
            items.push({mensagem: <div className="botoes-chat">{botoes}</div>})
        }
    }

    const onIniciar = () => {
        setMensagens([])
        throttledProcess(objJson.sequenciaMensagem, timeInterval)
    }

    const renderMensagens = () => {
        return mensagens.map((item, key) => <li key={key}>{item.mensagem}</li>)
    }

    const onCarregarExemplo = () => {
        setObjJson(json);
        setEditar(false);
    }

    const onCriar = () => {
        setEditar(true);
        setObjJson({sequenciaMensagem: []});
    }

    return (
        <Container>
            <GlobalStyle />
            <div>
                <div className="botoes">
                    <button onClick={onIniciar}>Iniciar / Reiniciar</button>
                    <button onClick={onCarregarExemplo}>Carregar exemplo</button>
                    <button onClick={onCriar}>Criar novo</button>
                </div>
                <div>
                    <ol>
                        {renderMensagens()}
                    </ol>
                </div>
            </div>
            <div>
                <EditJson editar={editar} json={objJson} setJson={setObjJson} />
            </div>
        </Container>
    );
}

export default App;
