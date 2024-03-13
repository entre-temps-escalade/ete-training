/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fr from '@/lang/fr.json'
import en from '@/lang/en.json'
import { useAppContext } from '@/context/AppContext'

export function t(selector: string): string {
    const { language } = useAppContext()
    const lang = language === 'fr' ? fr : en
    return selectNestedProperty(selector, lang)
}

function selectNestedProperty(selector: string, obj: any) {
    const selected = selector.split('.')[0]
    const rest = selector.slice(selected.length + 1)

    if (rest.includes('.')) {
        return selectNestedProperty(rest, obj[selected])
    }

    return obj[selected][rest]
}
