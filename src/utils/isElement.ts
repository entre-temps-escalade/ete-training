import React from 'react'

function isElement(el: React.ReactNode): el is React.ReactElement {
    if (Array.isArray(el) || el === null || typeof el !== 'object') {
        return false
    }

    return true
}

export default isElement
