export interface ITextBoxInterface {
  type: string
  value?: string | number | null
  labelName?: string
  placeHolder?: string
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleIconClick?: (e: React.MouseEvent<HTMLElement>) => void
  icon?: string
  name: string
  className?: string
}
