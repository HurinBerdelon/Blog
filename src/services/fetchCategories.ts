import { filter } from "@prismicio/client";
import { languages } from "@/config/languages";
import type { Subject } from "@/config/subjects";
import type { Locale } from "@/i18n";
import { createClient } from "prismicio";

export async function fetchCategories(subject: Subject, lang: string) {
    const client = createClient();

    const posts = await client.getAllByType("blog_post", {
        lang: languages[lang as Locale]?.prismic_code ?? "en-us",
        filters: [filter.at("my.blog_post.subject", subject)],
    });
    const tags = posts.map((post) => post.tags).flat();
    const uniqueTags = Array.from(new Set(tags));
    const sortedCategories = uniqueTags.map((tag) => {
        const arr = tags.filter((item) => item === tag);
        return { tag, count: arr.length };
    });

    sortedCategories.sort((a, b) => {
        return b.count - a.count;
    });

    return sortedCategories;
}
