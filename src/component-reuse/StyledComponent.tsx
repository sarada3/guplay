import styled from "styled-components";

export const TextSmall = styled.div`
  font-size: 14px;
`;

export const TextBlue = styled.span`
  color: ${(props) => props.theme.color.TEXT_BLUE};
`;

export const TextTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
`;

export const HoverButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #eee;
  }
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HoverEffect = styled(FlexCenter)<{ padding: string }>`
  padding: ${(props) => props.padding};
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform: translateZ(0);
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: #eee;
    opacity: 0;
  }
  &:hover {
    &:after {
      opacity: 1;
    }
  }
`;
