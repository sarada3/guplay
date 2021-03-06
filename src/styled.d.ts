// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      TEXT_NORMAL: string;
      TEXT_BLUE: string;
      LOGO: string;
    };
    length: {
      HEIGHT_HEADER: number;
      HEIGHT_HEADER_MOBILE: number;
    };
    zIndex: {
      POSITION_FIXED: {
        GUPLAY: {
          HEADER: number;
        };
        GAME: number;
        OVERLAY_CENTER_BOX: number;
      };
    };
    deviceSizes: {
      mobile: number;
      tablet: number;
      laptop: number;
      desktop: number;
    };
    device: {
      UPTO_MOBILE: string;
      UPTO_TABLET: string;
      UPTO_LAPTOP: string;
      UPTO_DESKTOP: string;
    };
  }
}
