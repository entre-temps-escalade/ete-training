import useWindowSize from "@/hooks/useWindowSize";
import {
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { MenuContext } from "./MenuContext";
import styles from "./Menu.module.scss";

interface Props {
  position?: "top" | "bottom";
}

interface Posision {
  top: number;
  left: number;
}

function MenuDropdown({
  children,
  position = "bottom",
}: PropsWithChildren<Props>) {
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
  const [_position, _setPosition] = useState<Posision>();
  const { height: windowHeight } = useWindowSize();
  const ctx = useContext(MenuContext);

  if (!ctx) {
    throw new Error(
      "Menu.Dropdown component should be the child of a Menu element",
    );
  }

  useLayoutEffect(() => {
    if (!ctx.targetRef || !dropdownRef || !windowHeight) return;

    const targetRect = ctx.targetRef.getBoundingClientRect();
    const dropdownHeight = dropdownRef.getBoundingClientRect().height;

    let top = 0;
    let left = 0;

    if (position === "top") {
      if (
        targetRect.top > dropdownHeight + 10 ||
        windowHeight - targetRect.bottom < dropdownHeight + 10
      ) {
        top = targetRect.top - dropdownHeight - 10;
      } else {
        top = targetRect.bottom + 10;
      }
    } else {
      if (
        windowHeight - targetRect.bottom > dropdownHeight + 10 ||
        targetRect.top < dropdownHeight + 10
      ) {
        top = targetRect.bottom + 10;
      } else {
        top = targetRect.top - dropdownHeight - 10;
      }
    }

    if (targetRect.left < 10) {
      left = 10;
    } else {
      left = targetRect.left;
    }

    _setPosition({ top, left });

    function handleOutsideClick(e: MouseEvent) {
      if (!e.target) return;

      if (
        !dropdownRef?.contains(e.target as Node) &&
        !ctx?.targetRef?.contains(e.target as Node)
      ) {
        ctx?.close();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef, position, ctx, windowHeight]);

  return (
    <div
      ref={setDropdownRef}
      className={`${styles.menu_dropdown} ${ctx.opened && styles.menu_dropdown__opened}`}
      style={{ top: _position?.top, left: _position?.left }}
    >
      {children}
    </div>
  );
}

export default MenuDropdown;
