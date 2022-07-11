import React, {useState} from "react";
import json from './chat.json'

import {Container} from './style'
import {GlobalStyle} from "./GlobalStyle";

function App() {
    const [objJson, setObjJson] = useState(json);
    const [mensagens, setMensagens] = useState([]);
    const [disableText, setDisableText] = useState(false);
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
            items.push({mensagem: <div className="botoes">{botoes}</div>})
        }
    }

    const onIniciar = () => {
        setMensagens([])
        throttledProcess(objJson.sequenciaMensagem, timeInterval)
    }

    const renderMensagens = () => {
        return mensagens.map((item, key) => <li key={key}>{item.mensagem}</li>)
    }

    const onSalvar = () => {
        setDisableText(true);
        const js = document.querySelector('#jsonTxt')
        setObjJson(JSON.parse(js.value));
        setTimeout(() => {
            setDisableText(false);
        }, 1000);
    }

    return (
        <Container>
            <GlobalStyle />
            <div>
                <button onClick={onIniciar}>Iniciar / Reiniciar</button>
                <div>
                    <ol>
                        {renderMensagens()}
                    </ol>
                </div>
            </div>
            <div>
                <button className="btn-salvar" disabled={disableText}
                        onClick={onSalvar}>{disableText ? 'Salvando...' : 'Salvar JSON'}</button>
                <textarea disabled={disableText} id="jsonTxt" defaultValue={JSON.stringify(json, null, 2)} />
            </div>
        </Container>
    );
}

export default App;
