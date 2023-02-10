export interface IButtonInterface {
  handleButtonClick?: (event: React.MouseEvent<HTMLElement>) => void
  children: string
  className?: string
}
