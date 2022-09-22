import React from "react";
import styled from "styled-components";

const DisplayStyle = styled.div`
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .Header {
    height: 80px;
    width: 100%;
    background-color: #7edbff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 20px;
      padding-left: 10px;
    }
    .buttons {
      display: flex;
      flex-direction: column;
      height: 60px;
      justify-content: space-between;
      margin-right: 10px;
      button {
        width: 120px;
        padding: 5px;
        height: 25px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
`;
function Display(props) {
  return (
    <DisplayStyle>
      <div className="Header">
        <h1>Sistema de Cadastro</h1>
        <div className="buttons">
          <button onClick={() => props.changePage("create")}>
            Novo Usuario
          </button>
          <button onClick={() => props.changePage("list")}>
            Listar Usuarios
          </button>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </DisplayStyle>
  );
}

export default Display;
