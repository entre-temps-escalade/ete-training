import { PropsWithChildren, useContext, useLayoutEffect, useState } from 'react'
import { MenuContext } from './MenuContext'
import { twMerge } from 'tailwind-merge'
import useWindowSize from '@/hooks/useWindowSize'

interface Props {
    position?: 'top' | 'bottom'
}

interface Position {
    top: number
}

function MenuDropdown({
    children,
    position = 'bottom',
}: PropsWithChildren<Props>) {
    const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null)
    const [_position, _setPosition] = useState<Position>()
    const { height: windowHeight } = useWindowSize()
    const ctx = useContext(MenuContext)

    if (!ctx) {
        throw new Error(
            'Menu.Dropdown component should be the child of a Menu element',
        )
    }

    useLayoutEffect(() => {
        if (!ctx.targetRef || !dropdownRef || !windowHeight) return

        const targetRect = ctx.targetRef.getBoundingClientRect()
        const dropdownHeight = dropdownRef.getBoundingClientRect().height

        if (position === 'top') {
            if (
                targetRect.top > dropdownHeight + 10 ||
                windowHeight - targetRect.bottom < dropdownHeight + 10
            ) {
                _setPosition({ top: targetRect.top - dropdownHeight - 10 })
            } else {
                _setPosition({ top: targetRect.bottom + 10 })
            }
        } else {
            if (
                windowHeight - targetRect.bottom > dropdownHeight + 10 ||
                targetRect.top < dropdownHeight + 10
            ) {
                _setPosition({ top: targetRect.bottom + 10 })
            } else {
                _setPosition({ top: targetRect.top - dropdownHeight - 10 })
            }
        }

        function handleOutsideClick(e: MouseEvent) {
            if (!e.target) return

            if (
                !dropdownRef?.contains(e.target as Node) &&
                !ctx?.targetRef?.contains(e.target as Node)
            ) {
                ctx?.close()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [dropdownRef, position, ctx, windowHeight])

    return (
        <>
            <div
                ref={setDropdownRef}
                className={twMerge(
                    'transition-opacity absolute',
                    !ctx.opened ? 'opacity-0 invisible' : 'opacity-100 visible',
                )}
                style={{
                    top: _position?.top,
                }}
            >
                {children}
            </div>
        </>
    )
}

export default MenuDropdown
