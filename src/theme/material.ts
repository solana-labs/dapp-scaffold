/**
 * You can use material-ui themes to customize the underlying wallet buttons
 * https://material-ui.com/customization/color/
 * Additional customization can be done by using material-ui primitives:
 * https://material-ui.com/customization/components/
 */
export const theme = {
  palette: {
    primary: {
      light: "#75CDE8",
      main: "#3FA3B5",
      dark: "#006584",
      contrastText: "#fff",
    },
    secondary: {
      light: "#B361FF",
      main: "#7836F4",
      dark: "#4E239E",
      contrastText: "#000",
    },
  },
} as const;
