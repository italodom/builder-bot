import styled from 'styled-components';

export const Container = styled.div`

  input {
    width: 100%;
    font-size: 15px;
    padding: 5px;
    border: 1px solid var(--cor5);
    border-radius: 5px;
  }

  pre {
    background: #f1f1f1;
    border-radius: 5px;
    padding: 10px;
  }

  > .botoes {
    display: flex;
    justify-content: flex-start;
    gap: 15px;
  }

  .box {
    margin: 15px 0;
  }

  .pergunta, .respostas, .mensagens {
    padding-left: 15px;
    border-left: 1px solid var(--cor4);
  }

  .btn-resposta-1 {
    margin: 10px 0;
  }

  .campo {
    margin-bottom: 10px;

    label {
      display: block;
      margin-bottom: 5px;
    }
  }
`