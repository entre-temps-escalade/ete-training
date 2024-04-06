import { twMerge } from 'tailwind-merge'
import Chevron from './icons/Chevron'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Props {
    className?: string
    leftSection?: React.ReactNode
    data: { label: string; value: string }[] | string[]
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
}

function Select({
    className,
    leftSection,
    placeholder,
    onChange,
    value,
    data,
}: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState(value || '')
    const [isScroll, setIsScroll] = useState(false)
    const selectRef = useRef<HTMLLabelElement>(null)
    const modalRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        function handleOutsideClick(e: MouseEvent) {
            if (!e.target) return

            if (!selectRef.current?.contains(e.target as Node)) {
                setIsOpen(false)
                setSearchValue(value || '')
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [value])

    function handleOpen(e: React.MouseEvent) {
        if ((e.target as Element).nodeName !== 'INPUT') return

        setIsOpen((isOpen) => !isOpen)
    }

    function handleSelect(e: React.MouseEvent) {
        onChange && onChange(e.currentTarget.getAttribute('data-value')!)
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        if (!isOpen) {
            setIsOpen(true)
        }
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        if (!modalRef.current) return

        setIsScroll(
            modalRef.current.scrollHeight > modalRef.current.clientHeight,
        )
    }, [modalRef.current?.scrollHeight, modalRef.current?.clientHeight])

    return (
        <label
            ref={selectRef}
            className={twMerge(
                'relative w-full flex items-center px-2.5 py-1.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 cursor-text',
                className,
            )}
            role="combobox"
            onClick={handleOpen}
        >
            {leftSection && (
                <div className="text-gray-400 sm:text-base mr-2.5">
                    {leftSection}
                </div>
            )}
            <input
                className="bg-white outline-none inline w-full"
                placeholder={placeholder}
                value={searchValue}
                onChange={handleSearch}
            />
            <div className="ml-2.5">
                <Chevron />
            </div>
            <div
                ref={modalRef}
                className={twMerge(
                    'absolute overflow-y-hidden flex-col p-2 top-0 left-0 translate-y-10 rounded-lg cursor-pointer bg-gray-50 w-full max-h-56',
                    isScroll &&
                        'hover:overflow-y-scroll border-r-transparent border-r-4 pr-1',
                    isOpen ? 'flex' : 'hidden',
                )}
            >
                {data
                    .map((d) => {
                        const label = typeof d === 'string' ? d : d.label
                        const value = typeof d === 'string' ? d : d.value
                        return { label, value }
                    })
                    .filter((d) =>
                        searchValue !== '' && searchValue !== value
                            ? d.label
                                  .normalizeString()
                                  .includes(searchValue.normalizeString())
                            : true,
                    )
                    .map((d) => (
                        <div
                            className={twMerge(
                                'p-2 rounded-md',
                                value === d.value
                                    ? 'bg-primary-200 text-gray-600'
                                    : 'hover:bg-primary-200',
                            )}
                            data-value={d.value}
                            key={d.value}
                            onClick={handleSelect}
                        >
                            {d.label}
                        </div>
                    ))}
            </div>
        </label>
    )
}

export default Select
