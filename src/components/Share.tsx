'use client'
import type { JSX } from "react"
import { motion } from "framer-motion";
import { ShareNetwork } from "phosphor-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useHasMounted } from "@/hooks/useHasMounted";
import {
    FacebookShareButton,
    FacebookIcon,
    XShareButton,
    XIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";

interface ShareProps {
    postLink: string;
    title: string;
}

export function Share({ postLink, title }: ShareProps): JSX.Element {
    const { t } = useTranslation();
    const hasMounted = useHasMounted();
    const canUseNativeShare = hasMounted && typeof navigator !== "undefined" && !!navigator.share;

    async function handleNativeShare() {
        try {
            await navigator.share({ title, url: postLink });
        } catch (error) {
            if ((error as DOMException)?.name !== "AbortError") {
                console.error(error);
            }
        }
    }

    return (
        <section>
            <span className="block mb-2 text-sm font-semibold">
                {t("common:shareThisPost")}
            </span>
            <ul className="flex gap-2">
                <motion.li whileHover={{ scale: 1.1 }}>
                    <FacebookShareButton url={postLink}>
                        <FacebookIcon className="w-8 h-8 rounded" />
                        <span className="sr-only">{`${t("common:shareOn")} Facebook`}</span>
                    </FacebookShareButton>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                    <XShareButton url={postLink} text={title}>
                        <XIcon className="w-8 h-8 rounded" />
                        <span className="sr-only">{`${t("common:shareOn")} Twitter`}</span>
                    </XShareButton>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                    <LinkedinShareButton url={postLink}>
                        <LinkedinIcon className="w-8 h-8 rounded" />
                        <span className="sr-only">{`${t("common:shareOn")} LinkedIn`}</span>
                    </LinkedinShareButton>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                    <WhatsappShareButton url={postLink} message={title}>
                        <WhatsappIcon className="w-8 h-8 rounded" />
                        <span className="sr-only">{`${t("common:shareOn")} WhatsApp`}</span>
                    </WhatsappShareButton>
                </motion.li>
                {canUseNativeShare && (
                    <motion.li whileHover={{ scale: 1.1 }}>
                        <button type="button" onClick={handleNativeShare}>
                            <ShareNetwork className="w-8 h-8 p-1 rounded" />
                            <span className="sr-only">{t("common:shareMore")}</span>
                        </button>
                    </motion.li>
                )}
            </ul>
        </section>
    );
}
