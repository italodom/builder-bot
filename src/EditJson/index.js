import React, {useCallback, useEffect, useState} from 'react';

import {Container} from './style'

const EditJson = ({json, setJson, editar}) => {
    const copyJson = json
    const [count, setCount] = useState(1);
    const [input, setInput] = useState({});
    const [setup, setSetup] = useState({level: 0, botoes: {btn0: true}});

    useEffect(() => {
        console.log('INPUT', input)
    }, [input]);

    const handleInput = (event, obj) => {
        const name = event.target.name
        const value = event.target.value
        obj.mensagem = value
        setInput({
            ...input,
            [name]: value
        })
        setJson(copyJson)
    }

    const renderFluxo = (jsonFluxo) => {
        if (jsonFluxo.sequenciaMensagem) {
            return renderMensagens(jsonFluxo);
        }
    }

    const renderMensagens = (jsonMensagens) => {
        if (jsonMensagens.sequenciaMensagem) {
            return jsonMensagens.sequenciaMensagem.map((mensagem, k) => {
                if (mensagem.evento === 'mensagem') {
                    return (
                        <div className="campo" key={`msg${k + mensagem.count}`}>
                            <label>Mensagem: </label>
                            <input disabled={!editar} type="text" name={`input${mensagem.count}`} onChange={(event) => handleInput(event, mensagem)} value={input[`input${mensagem.count}`] ?? mensagem.mensagem} />
                        </div>
                    )
                }

                if (mensagem.evento === 'pergunta') {
                    return renderPergunta(mensagem, k)
                }
            })
        }
    }

    const renderPergunta = (jsonPergunta, k) => {
        return (
            <div className="pergunta" key={k}>
                <div className="campo">
                    <label>Pergunta:</label>
                    <input type="text" disabled={!editar} name={`input${jsonPergunta.count}`} onChange={(event) => handleInput(event, jsonPergunta)} value={input[`input${jsonPergunta.count}`] ?? jsonPergunta.mensagem} />
                </div>

                {!editar || <div className="botoes">
                    <button onClick={() => add('resposta', jsonPergunta)}>Adicionar Resposta</button>
                </div>}

                <div className="respostas">
                    {renderRespostas(jsonPergunta)}
                </div>
            </div>
        )
    }

    const renderRespostas = (jsonRespostas) => {
        if (jsonRespostas.opcoesRespostas) {
            return jsonRespostas.opcoesRespostas.map((resposta, k) => (
                <React.Fragment key={`rep${resposta.count + k}`}>
                    <div className="campo">
                        <label>Resposta: </label>
                        <input type="text" disabled={!editar} name={`input${resposta.count}`} onChange={(event) => handleInput(event, resposta)} value={input[`input${resposta.count}`] ?? resposta.mensagem} />
                    </div>

                    {setup.botoes[`btn${resposta.level}`] && editar && <div className="botoes">
                        <button onClick={() => add('mensagem', resposta)}>Adicionar Mensagem</button>
                        <button onClick={() => add('pergunta', resposta)}>Adicionar Pergunta</button>
                    </div>}

                    <div className="mensagens">
                        {renderMensagens(resposta)}
                    </div>
                </React.Fragment>
            ))
        }
    }

    const add = (tipo, objJson) => {
        if (tipo === 'mensagem') {
            objJson.sequenciaMensagem.push({
                count,
                level: setup.level,
                evento: 'mensagem',
                mensagem: ''
            })
            setJson(copyJson)
            setInput({
                ...input,
                [`input${count}`]: ''
            })
            setCount(count+1);
        }
        if (tipo === 'pergunta') {
            setSetup({
                level: setup.level + 1,
                botoes: {
                    ...setup.botoes,
                    [`btn${setup.level}`]: false,
                    [`btn${setup.level + 1}`]: true,
                },
            });
            objJson.sequenciaMensagem.push({
                count,
                level: setup.level,
                evento: 'pergunta',
                mensagem: '',
                opcoesRespostas: []
            })
            setJson(copyJson)
            setInput({
                ...input,
                [`input${count}`]: ''
            })
            setCount(count+1);
        }
        if (tipo === 'resposta') {
            objJson.opcoesRespostas.push({
                count,
                level: setup.level,
                evento: 'resposta',
                mensagem: '',
                sequenciaMensagem: []
            })
            setJson(copyJson)
            setInput({
                ...input,
                [`input${count}`]: ''
            })
            setCount(count+1);
        }
    }

    return (
        <Container>
            <div>
                <h2>Definição de Fluxo</h2>
            </div>

            <div className="box">
                {renderFluxo(copyJson)}
            </div>

            {setup.botoes.btn0 && editar && <div className="botoes">
                <button onClick={() => add('mensagem', copyJson)}>Adicionar Mensagem</button>
                <button onClick={() => add('pergunta', copyJson)}>Adicionar Pergunta</button>
            </div>}

            <pre>
                {JSON.stringify(copyJson, null, 2)}
            </pre>
        </Container>
    );
};

export default EditJson;
