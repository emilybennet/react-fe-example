import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";

import BandForm from "./BandForm";

function App() {
  const bands = [skaBand, kpopBand, punkBand];
  return (
    <div className="App">
      <h1 className="text-3xl text-blue-400 font-bold underline">
        Hello world!
      </h1>
      <BandForm band={bands[0]} />
    </div>
  );
}

export default App;
