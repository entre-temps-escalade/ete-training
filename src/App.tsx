import ArrowIcon from "./icons/ArrowIcon";
import Navbar from "./components/Navbar";
import TrainingCard from "./components/TrainingCard/TrainingCard";
import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <div>
      <Navbar />
      <section className="flex flex-col mx-8 my-8 space-y-2">
        <div className="flex items-center justify-between w-full font-bold text-gray-primary">
          <ArrowIcon className="h-6" />
          Aujourd'hui
          <ArrowIcon className="h-6 rotate-180" />
        </div>
        <TrainingCard />
      </section>
      <section>
        <h2 className="text-gray-primary font-bold mx-8 my-3">Calendrier</h2>
        <Calendar />
      </section>
    </div>
  );
}

export default App;
