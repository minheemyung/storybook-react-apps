// .storybook/decorators.tsx
import { initialize, mswDecorator } from 'msw-storybook-addon'

import { ThemeProvider } from 'styled-components'
import { DecoratorFn } from '@storybook/react'
import { BrowserRouter, MemoryRouter, Route, Routes  } from 'react-router-dom'

import { Provider as StoreProvider } from 'react-redux'
// import configureStore to create a redux store on the fly
import { configureStore } from '@reduxjs/toolkit';

// drop store and import rootReducer instead
import { rootReducer } from '../src/app-state'

import { withDesign } from 'storybook-addon-designs'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { lightTheme, darkTheme } from '../src/styles/theme'

initialize()

const withTheme: DecoratorFn = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme
  const storyTheme = theme == 'dark' ? darkTheme : lightTheme
  return (
    <ThemeProvider theme={storyTheme}>
      <GlobalStyle />
      <StoryFn />
    </ThemeProvider>
  )
}

/**
 *
 * Provide components support for routing support and simulated deeplinking
 * it renders the component with a mocked history based on the route passed
 *
 * @example`
 * export const MyComponent = () => Template.bind({})
 * MyComponent.parameters = {
 *   deeplink: {
 *     path = '/restaurant/:id',
 *     route = '/restaurant/12',
 *   }
 * };
 */
export const withRouter: DecoratorFn = (StoryFn, { parameters: { deeplink } }) => {
  // if there's no deeplink parameter, just return the story in a BrowserRouter
  if (!deeplink) {
    return (
      <BrowserRouter>
        <StoryFn />
      </BrowserRouter>
    )
  }

  // if there is a deeplink parameter, wrap the story with a simulated route in MemoryRouter
  const { path, route } = deeplink

  return (
    <MemoryRouter
      // encode the route to simulate what the browser would do
      initialEntries={[encodeURI(route)]}
    >
      <Routes>
        <Route path={path} element={<StoryFn />} />
      </Routes>
    </MemoryRouter>
  )
}


export const withStore: DecoratorFn = (StoryFn, { parameters }) => {
  // Create a store by merging optional custom initialState coming from story parameters
  const store = configureStore({
    reducer: rootReducer,
    // if undefined, it will use default state from reducers
    preloadedState: parameters.store?.initialState,
  });
  return (
    <StoreProvider store={store}>
      <StoryFn />
    </StoreProvider>
  )
}

// export all decorators that should be globally applied in an array
export const globalDecorators = [
  mswDecorator,
  withTheme,
  withDesign,
  withRouter,
  withStore
]
