import { useTheme } from "@/hooks/useTheme"
import { Moon, Sun } from "phosphor-react"
import { useTranslation } from "next-i18next"

export function ThemeSwitcher(): JSX.Element {

    const { theme, setTheme } = useTheme()
    const { t } = useTranslation()

    async function handleChangeTheme() {
        if (theme === 'dark') setTheme('light')
        else setTheme('dark')
    }

    return (
        <button
            className="dark:text-textLight dark:hover:text-grayBrand text-backgroundDark hover:text-greenBrandDark text-3xl"
            type='button'
            onClick={handleChangeTheme}
        >
            <span className="sr-only">{t('common:changeTheme')}</span>
            {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
    )
}