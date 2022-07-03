import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import { UserProvider } from "./context/user";
import { GameProvider } from "./context/game";

import App from "./App";

function AppWrapper() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <UserProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default AppWrapper;
