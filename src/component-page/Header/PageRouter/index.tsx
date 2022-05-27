import styled from "styled-components";

import PageRouterLink from "./PageRouterLink";

import { PageRouteType } from "../../../types";

interface PageRouterProps {
  pageRoute: PageRouteType;
  replacePageRoute: (page: PageRouteType) => void;
}

const pageRoutesArr: Array<PageRouteType> = ["web", "mobile"];

function PageRouter(props: PageRouterProps) {
  const { pageRoute, replacePageRoute } = props;

  const pageIndex = pageRoutesArr.findIndex((page) => page === pageRoute);
  const scaleProp = pageRoute.length / 10 + 1;
  const translateXProp = (pageIndex + 1) * 100 - 60;

  return (
    <Container>
      {pageRoutesArr.map((path) => (
        <PageRouterLink
          key={path}
          path={path}
          pageRoute={pageRoute}
          replacePageRoute={replacePageRoute}
        />
      ))}
      {pageRoute !== "mypage" && (
        <Active scaleProp={scaleProp} translateXProp={translateXProp} />
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    display: none;
  }
`;

const Active = styled.span<{
  scaleProp: number;
  translateXProp: number;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 20px;
  height: 2px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transform: ${(props) =>
    `translateX(${props.translateXProp}px) scaleX(${props.scaleProp})`};
  transform-origin: center;
  background-color: #01875f;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;
export default PageRouter;
