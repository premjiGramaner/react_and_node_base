export interface IButtonInterface {
  handleButtonClick?: (event: React.MouseEvent<HTMLElement>) => void
  children: React.ReactNode
  className?: string
}
