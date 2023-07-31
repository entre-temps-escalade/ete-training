import Exercise from "./Exercise";

const TrainingCard = () => {
  return (
    <div className="bg-blue-450 rounded-md text-white px-5 py-3 space-y-2">
      <h3 className="font-bold">Séance Iso doigts</h3>
      <hr />
      <div className="mx-3">
        <div className="grid grid-cols-card">
          <Exercise name="Echauffement" duration={1200000} />
          <Exercise name="Iso doigts" duration={1800000} />
          <Exercise name="Repos" duration={480000} />
          <Exercise name="Blocs à doigts" duration={3600000} />
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
