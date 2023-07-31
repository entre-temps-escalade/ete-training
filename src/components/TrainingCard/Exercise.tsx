import { formatDuration } from "../../utils/date";

interface Props {
  name: string;
  duration: number;
}

const Exercise = ({ name, duration: durationInMs }: Props) => {
  const duration = formatDuration(durationInMs);

  return (
    <>
      <span className="text-sm">{name}</span>
      <hr className="divider" />
      <span className="text-sm text-right">{duration}</span>
    </>
  );
};

export default Exercise;
