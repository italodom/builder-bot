import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 25px;
  padding: 10px;
  color: var(--cor4);

  .botoes {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  
  .resposta {
    text-align: right;
    font-weight: bold;
    font-style: italic;
  }

  ul, ol {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    li {
      max-width: 500px;
      background: var(--cor3);
      border-radius: 5px;
      padding: 15px;
    }
  }

  textarea {
    display: flex;
    width: 90%;
    height: 500px;
    border: 1px solid var(--cor4);
    border-radius: 5px;
  }

  button {
    background: var(--cor2);
    color: var(--cor4);
    border: 0;
    padding: 10px 25px;
    border-radius: 5px;
    font-weight: bold;
    
    &.btn-salvar {
      margin-bottom: 15px;
    }
    
    &:disabled {
      opacity: 0.7;
    }

    &:hover {
      cursor: pointer;
    }

    &.btn-resposta {
      padding: 5px;
      background: var(--cor1);
      color: var(--white);
    }
  }

`