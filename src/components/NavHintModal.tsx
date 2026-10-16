'use client'
import { Dialog } from '@headlessui/react'
import { Books, Globe, X } from 'phosphor-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useNavHint } from '@/hooks/useNavHint'

export function NavHintModal(): JSX.Element {
    const { t } = useTranslation()
    const { isNavHintOpen, setIsNavHintOpen } = useNavHint()

    function close() {
        setIsNavHintOpen(false)
    }

    return (
        <Dialog open={isNavHintOpen} onClose={close}>
            <div className="fixed inset-0 z-10 bg-black opacity-75" />
            <Dialog.Panel className="fixed px-4 py-10 w-96 flex z-20 flex-col items-center gap-4 rounded top-[50%] text-backgroundDark dark:text-textLight translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white dark:bg-backgroundDark">
                <button
                    className="absolute top-3 right-3 text-xl hover:brightness-90"
                    onClick={close}
                >
                    <X className="text-backgroundDark dark:text-textLight" />
                </button>
                <Dialog.Title className="text-lg font-medium">{t('common:navHintTitle')}</Dialog.Title>
                <div className="flex flex-col gap-3 p-2">
                    <p className="flex gap-3 items-center">
                        <Books className="shrink-0 text-2xl" />
                        {t('common:navHintSubjectText')}
                    </p>
                    <p className="flex gap-3 items-center">
                        <Globe className="shrink-0 text-2xl" />
                        {t('common:navHintLangText')}
                    </p>
                </div>
                <Dialog.Description className="px-2 text-sm italic text-center">
                    {t('common:navHintReopenText')}
                </Dialog.Description>
                <button
                    className="px-4 py-1 font-medium rounded bg-greenBrand dark:bg-greenBrandDark text-textLight hover:brightness-90"
                    onClick={close}
                >
                    {t('common:gotIt')}
                </button>
            </Dialog.Panel>
        </Dialog>
    )
}
