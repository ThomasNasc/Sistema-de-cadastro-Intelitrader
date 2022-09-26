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
    background-color: #08b9ff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0px 0px 30px 30px;
    padding-left: 30px;
    padding-right: 30px;
    h1 {
      font-size: 20px;

      
    }
    .status{
      font-size: 12px;
      color: #000000;
      height: 5px;
      padding-bottom: 5px;
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
        <div>
        <h1>SISTEMA DE CADASTRO</h1>
        <h1 className="status">{props.toShowStatus}</h1>
        </div>

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
