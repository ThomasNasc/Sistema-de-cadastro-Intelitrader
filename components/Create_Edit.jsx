import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.div`
  width: 300px;
  form {
    display: flex;
    flex-direction: column;
    label {
      display: flex;
      flex-direction: column;
      margin-top: 5px;
      input {
        height: 30px;
        border-radius: 3px;
        padding: 5px;
      }
      input:read-only {
        color: gray;
        border: 2px solid gray;
      }
      .AgeInput {
        width: 100px;
      }
    }
    button {
      height: 40px;
      margin-top: 15px;
      border-radius: 5px;
      cursor: pointer;
      :hover {
        background-color: #7edbff;
        border-color: white;
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
    axios[method](`http://localhost:8080/api/Users/${id}`, userInfo)
      .then((resp) => {
        props.changePage("list")
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
        <label htmlFor="InserirNome">
          *Nome
          <input
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
        <button type="submit">Concluir</button>
      </form>
    </Form>
  );
}

export default Create_Edit;
