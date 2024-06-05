import { useContext, useState } from "react";
import Button from "../Button/Button";
import styles from "./DateSlider.module.scss";
import { DateSliderContext } from "./DateSliderContext";
import Menu from "../Menu/Menu";
import Icon from "../Icon/Icon";
import DateSliderMenu from "./DateSliderMenu";

export default function DateSliderButtons() {
  const { today, value } = useContext(DateSliderContext)!;
  const [reset, setReset] = useState(false);

  const handleReset = () => setReset(true);
  const handleToday = () => today();

  return (
    <div className={styles.button_array}>
      <Button className={styles.button} onClick={handleToday}>
        Aujourd'hui
      </Button>
      {["month", "year"].map((type) => (
        <Menu onExit={handleReset} key={type}>
          <Menu.Target>
            <Button className={styles.button}>
              <span>
                {value.format(type === "month" ? "MMMM" : "YYYY").capitalize()}
              </span>
              <Icon.ChevronDown />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <DateSliderMenu
              type={type as "month" | "year"}
              reset={reset}
              changeReset={setReset}
            />
          </Menu.Dropdown>
        </Menu>
      ))}
    </div>
  );
}
