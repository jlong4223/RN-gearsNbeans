import { useColorScheme } from 'react-native';
import { extendTheme } from 'native-base';

export function useTheme() {
  const colorScheme = useColorScheme();

  const theme = getTheme({ colorScheme });
  return theme;
}

function getTheme({ colorScheme }) {
  const isDarkMode = colorScheme === 'dark';

  const primaryBase = '#a4e310'; // primary 500
  const secondaryBase = '#737373'; // secondary 500

  const darkModeGreen = '#354c00'; // primary 800
  const lightModeGreen = '#80b107'; // primary 600

  const lightModeGray = '#1d1d1d'; // secondary 700
  const darkModeGray = '#bfbfbf'; // secondary 200

  const darkModeYellow = '#b39600';
  const lightModeYellow = '#ffd700';

  const theme = {
    colors: {
      textColor: isDarkMode ? darkModeGray : '#fff',
      background: isDarkMode ? '#000' : '#fff',
      altBackground: isDarkMode ? '#fff' : '#000',
      surface: isDarkMode ? darkModeGreen : lightModeGreen,
      onSurfaceColor: isDarkMode ? darkModeGray : lightModeGray,
      onSurfaceIconColor: isDarkMode ? darkModeGray : '#fff',
      border: isDarkMode ? darkModeGray : lightModeGreen,
      reviewsIcon: isDarkMode ? darkModeYellow : lightModeYellow,
      primary: {
        50: '#f7ffdf',
        100: '#e8feb0',
        200: '#dafe81',
        300: '#cbfd50',
        400: '#befd24',
        500: '#a4e310',
        600: '#80b107',
        700: '#5b7e01',
        800: '#354c00',
        900: '#101a00',
      },

      secondary: {
        50: '#f2f2f2',
        100: '#d9d9d9',
        200: '#bfbfbf',
        300: '#a6a6a6',
        400: '#8c8c8c',
        500: '#737373',
        600: '#595959',
        700: '#404040',
        800: '#262626',
        900: '#0d0d0d',
      },
    },
    config: {
      useSystemColorMode: true,
    },
  };
  return extendTheme({ ...theme });
}
