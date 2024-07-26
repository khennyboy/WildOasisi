import styled from "styled-components";
import { DarkModeContext } from "../context/DarkmodeContext";
import { useContext } from "react";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { IsDark } = useContext(DarkModeContext)

  const src = IsDark ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
