import baseColors from "styles/core/base-colors";

const dark = {
  tabBar: {
    borderTop: '#3a3a3a',
    background: baseColors.background.secondary,
    iconInactive: '#6a6a6a',
    iconActive: baseColors.primary,
  },
  button: {
    primary: {
      text: baseColors.secondary,
      background: baseColors.primary
    },
    secondary: {
      text: baseColors.primary,
      background: baseColors.background.secondary
    },
  },

  
} as const;

export default dark;
