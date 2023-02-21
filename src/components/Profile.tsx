import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export function Profile(): JSX.Element {

    const { user } = useUser()
    const { t } = useTranslation()

    return (
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-2 border-textLight overflow-hidden">
                {user
                    ? user.avatarURL
                        ? <img
                            referrerPolicy="no-referrer" src={user.avatarURL}
                            alt={`${user.name} ${t('common:profile')}`}
                            className="p-1 rounded-full cover w-full"
                        />
                        : <img
                            src="/avatar/user.png"
                            alt="profile template"
                            className="p-1 rounded-full cover w-full"
                        />
                    : <img
                        src="/avatar/user.png"
                        alt="profile template"
                        className="p-1 rounded-full cover w-full"
                    />
                }
            </div>
            {user ? (
                <>
                    <h4 className="font-medium text-center">{user.name}</h4>
                    <Link href="/user-settings" className="bg-greenBrandDark dark:bg-greenBrand hover:brightness-90 font-medium rounded py-[2px] px-3">
                        {t('common:profile')}
                    </Link>
                </>
            ) : null}
        </div>
    )
}