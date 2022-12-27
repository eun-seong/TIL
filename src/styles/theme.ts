import { createStitches } from '@stitches/react'

const { styled, css } = createStitches({
  theme: {
    colors: {
      gray200: '#E0E0E0',
      gray600: '#5D5D5D',
    },
    sizes: {
      contentWidth: '720px',
      footerHeight: '100px',
    },
  },
})

export { styled, css }
