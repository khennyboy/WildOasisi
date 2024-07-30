import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { DarkModeContext } from "../context/DarkmodeContext";
import { useContext } from "react";

function DarkModeToggle() {
    const { IsDark, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {IsDark ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    );
}

export default DarkModeToggle;
