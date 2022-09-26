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
  const [status, setStatus] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/Users/")
      .then((request) => setList(request.data));
      


  }, [actualPage]);

  function SelectPage(page) {
    switch (page) {
      case "list":
        return (
          <List
            changePage={setActualPage}
            getUser={setUserinFocus}
            List={ListItems}
          />
        );
      case "create":
        return (
          <Create_Edit
            Methods={"post"}
            defineStatus={setStatus}
            changePage={setActualPage}
          />
        );
      case "edit":
        return (
          <Create_Edit
            Methods={"put"}
            User={UserinFocus}
            changePage={setActualPage}
            defineStatus={setStatus}
          />
        );
      case "delete":
        return (
          <Create_Edit
            Methods={"delete"}
            boolReadOnly={true}
            User={UserinFocus}
            changePage={setActualPage}
            defineStatus={setStatus}
          />
        );

      default:
        return (
          <List
            changePage={setActualPage}
            getUser={setUserinFocus}
            List={ListItems}
          />
        );
    }
  }

  return (
    <Display toShowStatus={status} changePage={setActualPage}>
      {SelectPage(actualPage)}
    </Display>
  );
}
