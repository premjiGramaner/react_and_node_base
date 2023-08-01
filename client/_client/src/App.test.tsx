import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

test('renders learn react link', () => {
  render(<App />)

  const linkElement = screen.getByText(
    'Zededa Edge Access, navigational tree from Project - Edge Node - Edge Node Application with respective information for remote connectivity'
  )

  expect(linkElement).toBeInTheDocument()
})
