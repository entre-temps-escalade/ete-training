import isElement from '@/utils/isElement'
import { cloneElement, useContext } from 'react'
import { MenuContext } from './MenuContext'

function MenuTarget({ children }: React.PropsWithChildren) {
    const ctx = useContext(MenuContext)

    if (!ctx) {
        throw new Error(
            'Menu.Target component should be the child of a Menu element',
        )
    }

    if (!isElement(children)) {
        throw new Error(
            'Menu.Target component children should be a single element or component',
        )
    }

    function onClick() {
        ctx!.opened ? ctx!.close() : ctx!.open()
    }

    return cloneElement(children, { onClick, ref: ctx.setTargetRef })
}

export default MenuTarget
