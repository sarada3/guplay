import { DefaultTheme } from "styled-components";

const color = {
  TEXT_NORMAL: "#5f6368",
  TEXT_BLUE: "#1a73e8",
  LOGO: "#32d1ff",
};

const length = {
  HEIGHT_HEADER: 64,
  HEIGHT_HEADER_MOBILE: 56,
};

const zIndex = {
  POSITION_FIXED: {
    GUPLAY: {
      HEADER: 100,
    },
    GAME: 200,
    OVERLAY_CENTER_BOX: 300,
  },
};

const deviceSizes = {
  mobile: 375, // windows phone
  tablet: 768, // iPad
  laptop: 1280, // ipad pro 12
  desktop: 1920,
};

const device = {
  UPTO_MOBILE: `screen and (max-width: ${deviceSizes.mobile}px)`,
  UPTO_TABLET: `screen and (max-width: ${deviceSizes.tablet}px)`,
  UPTO_LAPTOP: `screen and (max-width: ${deviceSizes.laptop}px)`,
  UPTO_DESKTOP: `screen and (max-width: ${deviceSizes.desktop}px)`,
};

const theme: DefaultTheme = {
  color,
  length,
  zIndex,
  deviceSizes,
  device,
};

export default theme;
