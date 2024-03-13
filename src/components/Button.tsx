import clsx from 'clsx'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.ComponentProps<'button'> {
    className?: string
    children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
    { className, children, ...props },
    ref,
) {
    return (
        <button
            ref={ref}
            className={twMerge(
                clsx(
                    'text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
                    className,
                ),
            )}
            {...props}
        >
            {children}
        </button>
    )
})

export default Button
