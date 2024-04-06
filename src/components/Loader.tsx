import useAppContext from '@/hooks/useAppContext'
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string
    animate?: boolean
    children?: React.ReactNode
}

function Loader({ className, animate, children }: Props) {
    const { theme } = useAppContext()

    return (
        <div
            className={twMerge(
                'flex flex-col justify-center items-center',
                animate && 'animate-pulse',
                className,
            )}
        >
            <img
                className="w-40"
                src={theme === 'dark' ? '/ete.png' : '/ete-dark.png'}
                alt="logo"
                style={{ filter: 'brightness(0.5)' }}
            />
            {children && (
                <span className="mt-5 text-3xl font-bold text-[#878787] flex flex-col items-center">
                    {children}
                </span>
            )}
        </div>
    )
}

export default Loader
