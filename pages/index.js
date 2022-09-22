import axios from "axios";
import Display from "../components/Display";
import styles from "../styles/Home.module.css";
import List from "../components/List";
import Create_Edit from "../components/Create_Edit";
import { useEffect, useState } from "react";

export default function Home() {
  const [ListItems, setList] = useState([]);
  const [actualPage, setActualPage] = useState("list");
  const [UserinFocus, setUserinFocus] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Users/")
      .then((request) => setList(request.data));
  }, [actualPage]);

  return (
    <Display changePage={setActualPage}>
      {actualPage == "list" ? (
        <List
          changePage={setActualPage}
          getUser={setUserinFocus}
          List={ListItems}
        />
      ) : (
        ""
      )}
      {actualPage == "create" ? (
        <Create_Edit Methods={"post"} changePage={setActualPage} />
      ) : (
        ""
      )}
      {actualPage == "edit" ? (
        <Create_Edit Methods={"put"} User={UserinFocus} changePage={setActualPage} />
      ) : (
        ""
      )}
          {actualPage == "delete" ? (
        <Create_Edit Methods={"delete"} boolReadOnly={true} User={UserinFocus} changePage={setActualPage} />
      ) : (
        ""
      )}
    </Display>
  );
}
