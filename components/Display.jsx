import React from "react";
import styled from "styled-components";

const DisplayStyle = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .Header {
    height: 80px;
    width: 100%;
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-family: "Bebas Neue", cursive;
      font-size: 22px;
      color: white;
      margin-left: 20px;
      font-weight: 400;
      @media screen and (min-width: 500px) {
        font-size: 40px;
      }
    }
    .status {
      font-size: 12px;
      color: #ff0000;
      height: 5px;
      padding-bottom: 5px;
    }
    .button_container {
      display: flex;
      width: 150px;
      height: 60px;
      border-radius: 20px;
      justify-content: space-around;
      margin-right: 10px;
      align-items: center;
      background-color: #a10f0f;
      cursor: pointer;
      border: none;
      :hover {
        background-color: #c20b0b90;
        p {
          background-color: black;
          color: white;
        }
      }
      span {
        display: flex;
        text-align: center;
        color: white;
        font-size: 12px;
        text-align: center;
        align-items: center;
        width: 60px;
      }
      p {
        width: 40px;
        padding: 5px;
        height: 40px;
        background-color: white;
        border-radius: 50%;
        font-size: 30px;
      }
    }
  }
`;
function Display(props) {
  return (
    <DisplayStyle>
      <div className="Header">
        <div>
          <h1>Sistema de cadastro</h1>
          <h1 className="status">{props.toShowStatus}</h1>
        </div>

        <button
          onClick={() => props.changePage("create")}
          className="button_container"
        >
          <span>Cadastrar novo usuario:</span>
          <p>+</p>
        </button>
      </div>
      <div className="content">{props.children}</div>
    </DisplayStyle>
  );
}

export default React.memo(Display);
