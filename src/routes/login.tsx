import Button from '@/components/Button'
import Input from '@/components/Input'
import SegmentedControl from '@/components/SegmentedControl'
import { useAppContext } from '@/context/AppContext'
import emojis from '@/utils/emojis'
import { t } from '@/utils/translate'

export default function Login() {
    const { theme, language, changeLanguage } = useAppContext()

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <SegmentedControl
                    className="absolute top-3 right-3"
                    value={language}
                    onChange={(value: string) =>
                        changeLanguage(value as 'fr' | 'en')
                    }
                    data={[
                        { label: emojis.flag_fr, value: 'fr' },
                        { label: emojis.flag_en, value: 'en' },
                    ]}
                />
                <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img
                        className="w-8 h-8 mr-2"
                        src={theme === 'dark' ? '/ete.png' : '/ete-dark.png'}
                        alt="logo"
                    />
                    ETE Training
                </div>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t('account.sign_in_to_your_account').capitalize()}
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <Input
                                    label={t('account.email').capitalize()}
                                    name="email"
                                    id="email"
                                    placeholder={t(
                                        'account.enter_your_email',
                                    ).capitalize()}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    label={t('account.password').capitalize()}
                                    name="password"
                                    id="password"
                                    placeholder={t(
                                        'account.enter_your_password',
                                    ).capitalize()}
                                    required
                                    type="password"
                                />
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    {t('account.forgot_password').capitalize()}?
                                </a>
                            </div>
                            <Button type="submit" className="w-full">
                                {t('account.sign_in').capitalize()}
                            </Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {`${t('account.no_account_yet').capitalize()}? `}
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    {t('account.sign_up').capitalize()}
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
