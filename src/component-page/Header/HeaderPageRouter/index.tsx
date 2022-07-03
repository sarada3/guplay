import NavLinkItem from "./NavLinkItem";
import { FlexCenter } from "../../../component-reuse/StyledComponent";
import { playstore } from "../../../assets/icons";

import styled from "styled-components";
import { memo } from "react";

import { PageRouteType } from "../../../types";

const pageRoutesArr: Array<PageRouteType> = [
  "web",
  "mobile",
  "xbox",
  "playstation",
];

interface HeaderPageRouterProps {
  pageRoute: PageRouteType;
  replacePageRoute: (page: PageRouteType) => void;
}

function HeaderPageRouter(props: HeaderPageRouterProps) {
  const { pageRoute, replacePageRoute } = props;

  const pageIndex = pageRoutesArr.findIndex((page) => page === pageRoute);
  const strLength = pageRoute.length;
  const activeBarTransform = `translateZ(0) translateX(${
    100 * pageIndex
  }%) scaleX(${((100 / 16) * strLength) / 100})`;

  return (
    <Container>
      <Logo onClick={() => replacePageRoute("web")}>
        <LogoImg>{playstore}</LogoImg>
        <LogoText>Gu play</LogoText>
      </Logo>
      <NavLinks>
        {pageRoutesArr.map((path) => (
          <NavLinkItem
            key={path}
            path={path}
            pageRoute={pageRoute}
            replacePageRoute={replacePageRoute}
          />
        ))}
        {pageRoute !== "mypage" && (
          <ActiveBar activeBarTransform={activeBarTransform} />
        )}
      </NavLinks>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.span`
  margin-right: 10px;
  width: 35px;
  height: 30px;
  fill: ${(props) => props.theme.color.LOGO};
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    margin-right: 5px;
  }
`;

const LogoText = styled.span`
  font-size: 25px;
  font-weight: 600;
`;

const NavLinks = styled(FlexCenter)`
  position: relative;
  height: 100%;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    display: none;
  }
`;

const ActiveBar = styled.div<{
  activeBarTransform: string;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 25%;
  height: 3px;
  border-top-left-radius: 999px;
  border-top-right-radius: 999px;
  transform: ${(props) => props.activeBarTransform};
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #01875f;
`;
export default memo(HeaderPageRouter);
