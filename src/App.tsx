import "./App.css";
import { Slider } from "./components/Slider";

function App() {
  return (
    <div className="page">
      <Slider type="Continuous" subtype="Single" onChange={() => {}} />
    </div>
  );
}

export default App;
