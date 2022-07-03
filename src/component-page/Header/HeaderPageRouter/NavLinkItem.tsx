import styled from "styled-components";

import { PageRouteType } from "../../../types";

interface NavLinkItemProps {
  path: PageRouteType;
  pageRoute: PageRouteType;
  replacePageRoute: (page: PageRouteType) => void;
}

function NavLinkItem(props: NavLinkItemProps) {
  const { path, pageRoute, replacePageRoute } = props;

  const isActive = path === pageRoute;
  const linkColor = isActive ? "#01875f" : "inherit";

  return (
    <Container>
      <Link linkColor={linkColor} onClick={() => replacePageRoute(path)}>
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
  linkColor: string;
}>`
  font-size: 14px;
  font-weight: 550;
  text-transform: uppercase;
  color: ${(props) => props.linkColor};
`;

export default NavLinkItem;
