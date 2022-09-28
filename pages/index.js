import Display from "../components/Display";
import styles from "../styles/Home.module.css";
import List from "../components/List";
import Create_Edit from "../components/Create_Edit";
import { useState } from "react";

export default function Home() {
  const [actualPage, setActualPage] = useState("optionsClosed");
  const [UserinFocus, setUserinFocus] = useState([]);
  const [status, setStatus] = useState("");

  function SelectPage(page) {
    switch (page) {
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
    
    }
  }

  return (
    <Display toShowStatus={status} changePage={setActualPage}>
      {SelectPage(actualPage)}
      <List
            changePage={setActualPage}
            getUser={setUserinFocus}
            actualPage={actualPage}
          />
      
    </Display>
  );
}
