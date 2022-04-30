import styled from "styled-components";
import React from "react";

import { PageRouteType } from "../../../types";

interface PageRouterLinkProps {
  path: PageRouteType;
  pageRoute: PageRouteType;
  handlePageRoute: (page: PageRouteType) => void;
}

function PageRouterLink(props: PageRouterLinkProps) {
  const { path, pageRoute, handlePageRoute } = props;
  const isActive = path === pageRoute;
  return (
    <Container>
      <Link isActive={isActive} onClick={() => handlePageRoute(path)}>
        {path}
      </Link>
    </Container>
  );
}

const Container = styled.div``;

const Link = styled.a<{
  isActive: boolean;
}>`
  position: relative;
  height: 100%;
  color: ${(props) => (props.isActive ? "#01875f" : "inherit")};
`;

export default PageRouterLink;
