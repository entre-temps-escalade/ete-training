import fr from '@/lang/fr.json'
import en from '@/lang/en.json'
import useAppContext from './useAppContext'

type TranslationObject = {
    [key: string]: string | TranslationObject
}

function useTranslate(selector: string): string {
    const { language } = useAppContext()
    const lang = language === 'fr' ? fr : en
    return selectNestedProperty(selector, lang)
}

function selectNestedProperty(selector: string, obj: TranslationObject) {
    const selected = selector.split('.')[0]
    const rest = selector.slice(selected.length + 1)

    if (rest.includes('.')) {
        if (typeof obj[selected] === 'object') {
            return selectNestedProperty(
                rest,
                obj[selected] as TranslationObject,
            )
        }
        throw new Error('Property does not exist')
    }

    if (rest != '') {
        if (typeof obj[selected] === 'object') {
            return (obj[selected] as TranslationObject)[rest] as string
        }
        throw new Error('Property does not exist')
    }

    if (selector.includes('.')) {
        return ''
    }

    return obj[selected] as string
}

export default useTranslate
