// test-runner.js
const { injectAxe, checkA11y } = require('axe-playwright')

module.exports = {
  async preRender(page) {
    // inject Axe to the playwright page before rendering the component
    await injectAxe(page)
  },
  async postRender(page) {
    // check accessibility from #root element (Story wrapper) and provide the HTML element in the error
    await checkA11y(page, '#root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })
  },
}
