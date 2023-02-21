import { Dialog } from "@headlessui/react";
import { GoogleLogo } from 'phosphor-react'
import { signIn } from 'next-auth/react'
import { useUser } from "@/hooks/useUser";
import { useTranslation } from "next-i18next";

interface LoginModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

export function LoginModal({ isOpen, onRequestClose }: LoginModalProps): JSX.Element {

    const { setPath } = useUser()
    const { t } = useTranslation()

    function handleLogin() {
        setPath()
        signIn("google", { callbackUrl: '/login_callback' })
    }

    return (
        <Dialog open={isOpen} onClose={onRequestClose}>
            <div className="fixed inset-0 bg-black opacity-75" />
            <Dialog.Panel className="fixed px-2 py-4 w-96 flex flex-col items-center gap-2 rounded top-[50%] text-backgroundDark translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white">
                <Dialog.Title className="text-lg font-medium">
                    {t('common:welcome')}
                </Dialog.Title>
                <Dialog.Description className="p-2 text-justify">
                    {t('common:loginToInteract')}
                </Dialog.Description>
                <button
                    className="flex gap-2 items-center bg-greenBrand py-1 px-2 rounded text-textLight font-medium"
                    onClick={handleLogin}
                >
                    <GoogleLogo />
                    {t('common:loginWithGoogle')}
                </button>
            </Dialog.Panel>
        </Dialog>
    )
}