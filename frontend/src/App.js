import { Sidebar } from "./components";
function App() {
  return (
    <div className="App">
      <div className="w-full bg-dark-5 flex flex-row">
        <Sidebar>
          
        </Sidebar>
        <div className="w-auto">
          <h1>App</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
