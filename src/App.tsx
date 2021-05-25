import React from "react";
import Router from "./Router";
import { Loading } from "./components/CommonParts/index";

function App() {
  return (
    <>
      <Loading>
        <main className="c-main">
          <Router />
        </main>
      </Loading>
    </>
  );
}

export default App;
