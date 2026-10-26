'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShareNetwork } from "phosphor-react";
import { useTranslation } from "@/hooks/useTranslation";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
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
    const [canUseNativeShare, setCanUseNativeShare] = useState(false);

    useEffect(() => {
        setCanUseNativeShare(typeof navigator !== "undefined" && !!navigator.share);
    }, []);

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
                    <FacebookShareButton url={postLink} quote={title}>
                        <FacebookIcon className="w-8 h-8 rounded" />
                        <span className="sr-only">{`${t("common:shareOn")} Facebook`}</span>
                    </FacebookShareButton>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                    <TwitterShareButton url={postLink} title={title}>
                        <TwitterIcon className="w-8 h-8 rounded" />
                        <span className="sr-only">{`${t("common:shareOn")} Twitter`}</span>
                    </TwitterShareButton>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                    <LinkedinShareButton
                        url={postLink}
                        title={title}
                        source={"blog.hurinberdelon.com"}
                    >
                        <LinkedinIcon className="w-8 h-8 rounded" />
                        <span className="sr-only">{`${t("common:shareOn")} LinkedIn`}</span>
                    </LinkedinShareButton>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }}>
                    <WhatsappShareButton url={postLink} title={title}>
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
