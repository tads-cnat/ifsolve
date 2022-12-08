import { FiHome, FiList } from "react-icons/fi";

import { Sidebar, SidebarItem } from "./components";
function App() {
  return (
    <div className="App">
      <div className="w-full bg-dark-5 flex flex-row">
        <Sidebar>
          <SidebarItem icon={<FiHome></FiHome>} title="Provas"></SidebarItem>
          <SidebarItem icon={<FiList></FiList>} title="Questões"></SidebarItem>
        </Sidebar>
        <div className="w-auto">
          <h1>App</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
