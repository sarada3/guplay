import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./AppWrapper";

// issue? : game창은 id game인 div에서 열리는데,, AppWrapper에서 App으로 전달한 Game, User context Provider가 작동한다.
const root = ReactDOM.createRoot(
  document.getElementById("guplay") as HTMLElement
);
root.render(<AppWrapper />);
