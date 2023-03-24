module.exports = {
  staticDirs: ['../public'],
  stories: [
    '../src/docs/Introduction.stories.mdx',
    '../src/docs/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/preset-create-react-app', "storybook-addon-designs",
  '@storybook/addon-interactions',
  '@storybook/addon-a11y',],
  // enable playback controls feature (Might be default later, but required in 6.4)
  features: {
    interactionsDebugger: true,
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
}
