import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #80808058;
  display: flex;
  justify-content: center;

  form {
    width: 350px;
    background-color: #fffffff2;
    height: max-content;
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 15px;
    transform: translateY(100px);
    p {
      margin-top: 10px;
      font-size: 10px;
    }
    label {
      display: flex;
      flex-direction: column;
      margin-top: 8px;

      input {
        height: 40px;
        border-radius: 10px;
        margin-top: 5px;
        padding-left: 5px;
      }
      input:read-only {
        color: gray;
        border: 2px solid gray;
        background-color: #80808036;
      }

      .AgeInput {
        width: 60px;
      }
    }
    button {
      height: 40px;
      margin-bottom: 12px;
      border-radius: 5px;
      cursor: pointer;
      :hover {
        background-color: #7edbff;
        border-color: #000000;
        color: white;
      }
    }
  }
`;

function Create_Edit(props) {
  const [name, setName] = useState(
    props.User === undefined ? "" : props.User.firstName
  );
  const [surName, setSurName] = useState(
    props.User == undefined ? "" : props.User.surName
  );
  const [age, setAge] = useState(props.User == undefined ? "" : props.User.age);

  const value = {
    firstName: name,
    surName: surName,
    age: age,
  };
  function submit(userInfo, method) {
    const id = props.User ? props.User.id : "";
    props.changePage("optionsClosed");
    axios[method](`http://localhost:8080/api/Users/${id}`, userInfo)
      .then(() => {
        let statusMsg = "";
        switch (method) {
          case "post":
            statusMsg = "Usuario adicionado com sucesso";
            break;
          case "put":
            statusMsg = "Alterações salvas com sucesso";
            break;
          case "delete":
            statusMsg = "Usuario apagado com sucesso";
            break;
        }
        props.defineStatus(statusMsg);
        setTimeout(() => {
          props.defineStatus("");
        }, 5000);
      })
      .catch((erro) => console.log(erro));
  }

  return (
    <Form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value, props.Methods);
        }}
      >
        {(props.Methods === "delete" ||
          props.Methods === "put") && (
            <div>
              {props.Methods === "delete" && (
                <h3>O seguinte usuario será apagado:</h3>
              )}
              <label htmlFor="InserirNome">
                Id
                <input
                  required={true}
                  readOnly={true}
                  value={props.User.id}
                  type="text"
                />
              </label>
            </div>
          )}
        <label htmlFor="InserirNome">
          *Nome
          <input
            placeholder="Insira um nome..."
            required={true}
            readOnly={props.boolReadOnly}
            id="InserirNome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </label>
        <label htmlFor="InserirNome">
          Sobrenome
          <input
            placeholder="Insira um sobrenome..."
            readOnly={props.boolReadOnly}
            id="InserirNome"
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
            type="text"
          />
        </label>
        <label htmlFor="InserirNome">
          *Idade
          <input
            className="AgeInput"
            required={true}
            readOnly={props.boolReadOnly}
            id="InserirNome"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
          />
        </label>
        <p>* Valores Obrigatorios</p>
        <button type="submit">Concluir</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            props.changePage("optionsClosed");
          }}
        >
          Cancelar
        </button>
      </form>
    </Form>
  );
}

export default Create_Edit;
