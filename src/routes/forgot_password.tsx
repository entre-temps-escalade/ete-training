import Button from '@/components/Button'
import Input from '@/components/Input'
import SegmentedControl from '@/components/SegmentedControl'
import ThemeIcon from '@/components/ThemeIcon'
import useAppContext from '@/hooks/useAppContext'
import useTranslate from '@/hooks/useTranslate'
import emojis from '@/utils/emojis'

function ForgotPassword() {
    const { theme, language, changeLanguage } = useAppContext()

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="absolute top-3 right-3 flex items-center space-x-4">
                    <ThemeIcon />
                    <SegmentedControl
                        value={language}
                        onChange={(value: string) =>
                            changeLanguage(value as 'fr' | 'en')
                        }
                        data={[
                            { label: emojis.flag_fr, value: 'fr' },
                            { label: emojis.flag_en, value: 'en' },
                        ]}
                    />
                </div>
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
                            {useTranslate('account.forgot_password')}
                        </h1>
                        <form>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <Input
                                        label={useTranslate('account.email')}
                                        name="email"
                                        id="email"
                                        placeholder={useTranslate(
                                            'account.enter_your_email',
                                        )}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    {useTranslate(
                                        'account.send_recuperation_link',
                                    )}
                                </Button>
                            </div>
                            <div className="text-center mt-2">
                                <a
                                    href="/login"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    {useTranslate('account.login')}
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword
