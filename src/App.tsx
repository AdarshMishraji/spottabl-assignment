import { Card, Header, MultiSelectionSearchBox, UserList } from "./components";
import { locale } from "./constants";
import { UserContextProvider } from "./context";

import "./index.css";

function App() {
  return (
    <div id="app-root">
      <Header />
      <UserContextProvider>
        <Card>
          <Card.Title headerText={locale.customerSuccessManagers} />
          <Card.Body>
            <MultiSelectionSearchBox />
            <UserList />
          </Card.Body>
        </Card>
      </UserContextProvider>
    </div>
  );
}

export default App;
