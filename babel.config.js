module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ts', '.tsx', '.json'],
        root: ['.'],
        alias: {
          components: './src/components/',
          config: './src/config/',
          context: './src/context/',
          navigation: './src/navigation/',
          screens: './src/screens/',
          scripts: './src/scripts',
          styles: './src/styles/',
          types: './src/types/',
        },
      },
    ],
  ],
};
