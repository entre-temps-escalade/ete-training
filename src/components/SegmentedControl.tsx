import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    value: string
    onChange: (value: string) => void
    data: { label: string; value: string }[]
    className?: string
}

export default function SegmentedControl({
    value,
    onChange,
    data,
    className,
}: Props) {
    const [activePosition, setActivePosition] = useState({
        width: 0,
        translate: 0,
    })
    const selectedRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (selectedRef.current) {
            setActivePosition({
                width: selectedRef.current!.offsetWidth,
                translate:
                    data.findIndex((d) => d.value === value) *
                    selectedRef.current!.offsetWidth,
            })
        }
    }, [value, data])

    function handleClick(value: string) {
        onChange(value)
    }

    return (
        <div
            className={twMerge(
                clsx(
                    'bg-white dark:bg-gray-800 rounded-lg dark:border dark:border-gray-700 relative',
                    className,
                ),
            )}
        >
            <div
                className="bg-white dark:bg-primary-600 h-full rounded-md absolute transition"
                style={{
                    width: activePosition.width,
                    transform: `translateX(${activePosition.translate}px)`,
                }}
            ></div>

            {data.map((d) => (
                <button
                    key={d.value}
                    onClick={() => handleClick(d.value)}
                    ref={d.value === value ? selectedRef : null}
                    className={clsx(
                        'rounded-md py-2 focus:outline-none sm:px-3 px-2 z-10 relative',
                    )}
                >
                    {d.label}
                </button>
            ))}
        </div>
    )
}
