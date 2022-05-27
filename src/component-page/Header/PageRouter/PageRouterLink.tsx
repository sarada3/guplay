import styled from "styled-components";
import React from "react";

import { PageRouteType } from "../../../types";

interface PageRouterLinkProps {
  path: PageRouteType;
  pageRoute: PageRouteType;
  replacePageRoute: (page: PageRouteType) => void;
}

function PageRouterLink(props: PageRouterLinkProps) {
  const { path, pageRoute, replacePageRoute } = props;

  const isActive = path === pageRoute;

  return (
    <Container>
      <Link isActive={isActive} onClick={() => replacePageRoute(path)}>
        {path}
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100px;
  text-align: center;
`;

const Link = styled.a<{
  isActive: boolean;
}>`
  position: relative;
  height: 100%;
  color: ${(props) => (props.isActive ? "#01875f" : "inherit")};
`;

export default PageRouterLink;
