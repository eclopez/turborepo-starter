import * as React from 'react'
import '../../globals.css'

function RootLayout(props: React.HTMLProps<HTMLHtmlElement>) {
  const { children } = props
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
