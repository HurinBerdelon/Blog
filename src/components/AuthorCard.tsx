'use client'
import { AllDocumentTypesExtended } from "@/schema/AllDocumentTypesExtended";
import { PrismicAuthor } from "@/schema/Author";
import { formatDate } from "@/services/dayjs";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import { UserCircle } from "phosphor-react";

interface AuthorCardProps {
    post: AllDocumentTypesExtended;
}

export function AuthorCard({ post }: AuthorCardProps): JSX.Element {
    const { t } = useTranslation();
    const author = post.data.author as PrismicAuthor | undefined;
    const authorName = author?.data?.name ?? t('common:anonymousAuthor');
    const avatar = author?.data?.authorprofileimage;

    return (
        <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                {avatar?.url ? (
                    <Image
                        width={40}
                        height={40}
                        src={avatar.url}
                        alt={avatar.alt ?? authorName}
                        className="object-cover w-full h-full rounded-full"
                        loading="eager"
                    />
                ) : (
                    <UserCircle className="w-full h-full text-backgroundDark dark:text-textLight" weight="fill" />
                )}
            </div>
            <div className="flex flex-col">
                <span className="font-medium">{authorName}</span>
                <span className="text-sm italic">
                    {formatDate(post.first_publication_date)}
                </span>
            </div>
        </div>
    );
}
