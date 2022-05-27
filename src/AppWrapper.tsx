import { ThemeProvider } from "styled-components";
import { GameProvider } from "./context/game";
import { UserProvider } from "./context/user";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

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
