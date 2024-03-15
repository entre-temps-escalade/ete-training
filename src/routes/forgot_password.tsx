import Button from '@/components/Button'
import Input from '@/components/Input'
import SegmentedControl from '@/components/SegmentedControl'
import { useAppContext } from '@/context/AppContext'
import emojis from '@/utils/emojis'
import { t } from '@/utils/translate'

export default function ForgotPassword() {
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
                            {t('account.forgot_password').capitalize()}
                        </h1>
                        <form>
                            <div className="space-y-4 md:space-y-6">
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
                                <Button type="submit" className="w-full">
                                    {t(
                                        'account.send_recuperation_link',
                                    ).capitalize()}
                                </Button>
                            </div>
                            <div className="text-center mt-2">
                                <a
                                    href="/login"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    {t('account.login').capitalize()}
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
