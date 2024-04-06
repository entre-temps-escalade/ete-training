import { PropsWithChildren } from 'react'
import MenuTarget from './MenuTarget'
import { MenuProvider } from './MenuContext'
import MenuDropdown from './MenuDropdown'

function Menu({ children }: PropsWithChildren) {
    return <MenuProvider>{children}</MenuProvider>
}

Menu.Target = MenuTarget
Menu.Dropdown = MenuDropdown

export default Menu
