import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

const ListStyle = styled.div`
  padding-top: 20px;
  td {
    max-width: 300px;
    width: 21vw;
    color: white;
    height: 50px;
    text-align: center;
    word-break: break-word;
    @media screen and (min-width: 500px) {
      width: 22vw;
      height: 50px;
    }
  }

  .Tabela {
    border-spacing: 0px 3px;
    .tdShortWdt {
      width: 45px;
      @media screen and (min-width: 500px) {
        width: 100px;
      }
    }
    thead {
      tr {
        td {
          text-transform: uppercase;
          font-size: 10px;
          background-color: #141414;
          padding: 5px;
          font-weight: 600;
          color: #b9b2b2;
          @media screen and (min-width: 500px) {
            font-size: 16px;
          }
        }
      }
    }
    tbody {
      .Linha_Principal {
        background-color: #302f2f;
        .idCell {
          font-size: 10px;
          color: #8d8b8b;
          letter-spacing: 2px;
          height: 25px;
          word-break: normal;
          @media screen and (min-width: 500px) {
            font-size: 12px;
          }
        }
        :hover {
          background-color: #1b1b1b;
          transition: 1s;
          @media screen and (min-width: 500px) {
            font-size: 16px;
            transform: scale(1.03);
          }
        }
        td {
          font-family: "Inconsolata", monospace;
          font-size: 12px;
          font-weight: 300;
          color: #e7e7e7;
          letter-spacing: 1px;
          @media screen and (min-width: 500px) {
            font-size: 20px;
          }
        }
      }
      tr,
      td {
        border-radius: 5px;
      }
      button {
        width: 95%;
        height: 80%;
        border: none;
        border-radius: 10px;
        background-color: #a10f0f;
        padding: 5px;
        cursor: pointer;
        :hover {
          background-color: #ff7e7e;
          border-color: white;
        }
        svg {
          width: 20px;
          height: 20px;
          @media screen and (min-width: 500px) {
            width: 30px;
            height: 30px;
          }
        }
        @media screen and (min-width: 500px) {
          width: 95%;
          height: 95%;
        }
      }
    }
  }
`;
function List(props) {
  const [ListItems, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      await axios
        .get("http://localhost:8080/api/Users/")
        .then((request) => {
          setList(request.data);
        })
        .catch((error) => {
          console.log(error);
          clearInterval(UpdateList);
        });
    };
    getList();
    const UpdateList = setInterval(() => {
      getList();
    }, 1000);
    return () => clearInterval(UpdateList);
  }, []);
  ListItems.sort(
    (a, b) =>
      new Date(a.dateOfCreation).getTime() -
      new Date(b.dateOfCreation).getTime()
  ).reverse();
  return (
    <ListStyle>
      <table className="Tabela">
        <thead>
          <tr>
            <td>Nome</td>
            <td>Sobrenome</td>
            <td className="tdShortWdt">Idade</td>
            <td>Data de Cadastro</td>
            <td colSpan={2} className="tdShortWdt">
              Editar/<br/>Deletar
            </td>
          </tr>
        </thead>
        <tbody>
          {ListItems.map((user, index) => {
            return (
              <tr className="Linha_Principal" key={index}>
                <td colSpan={4}>
                  <table>
                    <tbody>
                      <tr>
                        <td className="cell_info">{user.firstName}</td>
                        <td className="cell_info">{user.surName}</td>
                        <td className="tdShortWdt cell_info">{user.age}</td>
                        <td className="cell_info  date">
                          {new Date(
                            new Date(user.dateOfCreation).getTime()
                          ).toLocaleString("pt-BR")}
                        </td>
                      </tr>
                      <tr>
                        <td className="idCell cell_info" colSpan={4}>
                          <span>Id:</span> {user.id}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>

                <td className="tdShortWdt">
                  <button
                    data-testid="editar"
                    onClick={() => {
                      props.changePage("edit");
                      props.getUser(user);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M421.7 220.3l-11.3 11.3-22.6 22.6-205 205c-6.6 6.6-14.8 11.5-23.8 14.1L30.8 511c-8.4 2.5-17.5 .2-23.7-6.1S-1.5 489.7 1 481.2L38.7 353.1c2.6-9 7.5-17.2 14.1-23.8l205-205 22.6-22.6 11.3-11.3 33.9 33.9 62.1 62.1 33.9 33.9zM96 353.9l-9.3 9.3c-.9 .9-1.6 2.1-2 3.4l-25.3 86 86-25.3c1.3-.4 2.5-1.1 3.4-2l9.3-9.3H112c-8.8 0-16-7.2-16-16V353.9zM453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-14.5 14.5-22.6 22.6-11.3 11.3-33.9-33.9-62.1-62.1L314.3 67.7l11.3-11.3 22.6-22.6 14.5-14.5c25-25 65.5-25 90.5 0z" />
                    </svg>
                  </button>
                </td>
                <td className="tdShortWdt">
                  <button
                    onClick={() => {
                      props.changePage("delete");
                      props.getUser(user);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ListStyle>
  );
}

export default React.memo(List);
