import baseColors from "styles/core/base-colors";

const dark = {
  text: {
    primaryTheme: baseColors.primary,
    primary: '#e3e3e3',
    secondary: '#6e6e6e',
    muted: '#555',
    input: '#aaa',
  },
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
    blue: {
      text: baseColors.secondary,
      background: '#0096FF'
    },
  },

  
} as const;

export default dark;
