/* eslint-disable prettier/prettier */
export type Theme = 'default' | 'orange' | 'green'

export type SetThemeParams = (theme: Theme) => void

export type ThemeParams = { name: Theme; hex: string }

export type WidgetProps = {
  item: number
  widget: () => JSX.Element
}
