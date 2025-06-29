import darkThemeColors from "./dark-theme-colors"
import baseColors from "./base-colors";


const themes = {
    ...baseColors,
    ...darkThemeColors,
} as const;

const COLORS = themes;

export default COLORS;
