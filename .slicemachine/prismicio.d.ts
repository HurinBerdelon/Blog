// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for BlogPost documents */
interface BlogPostDocumentData {
    /**
     * Title of the Post field in *BlogPost*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: blog_post.title_of_the_post
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title_of_the_post: prismicT.KeyTextField;
    /**
     * Banner field in *BlogPost*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: blog_post.banner
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    banner: prismicT.ImageField<never>;
    /**
     * subjects field in *BlogPost*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: Use each subject in a line
     * - **API ID Path**: blog_post.subjects
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    subjects: prismicT.RichTextField;
    /**
     * Author field in *BlogPost*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: blog_post.author
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    author: prismicT.KeyTextField;
    /**
     * Slice Zone field in *BlogPost*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: blog_post.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<BlogPostDocumentDataSlicesSlice>;
}
/**
 * Slice for *BlogPost → Slice Zone*
 *
 */
type BlogPostDocumentDataSlicesSlice = TextAndImageSlice | TextOnlySlice;
/**
 * BlogPost document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<BlogPostDocumentData>, "blog_post", Lang>;
export type AllDocumentTypes = BlogPostDocument;
/**
 * Primary content in ImageOnly → Primary
 *
 */
interface ImageOnlySliceDefaultPrimary {
    /**
     * Image field in *ImageOnly → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: image_only.primary.image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
}
/**
 * Default variation for ImageOnly Slice
 *
 * - **API ID**: `default`
 * - **Description**: `ImageOnly`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ImageOnlySliceDefault = prismicT.SharedSliceVariation<"default", Simplify<ImageOnlySliceDefaultPrimary>, never>;
/**
 * Slice variation for *ImageOnly*
 *
 */
type ImageOnlySliceVariation = ImageOnlySliceDefault;
/**
 * ImageOnly Shared Slice
 *
 * - **API ID**: `image_only`
 * - **Description**: `ImageOnly`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ImageOnlySlice = prismicT.SharedSlice<"image_only", ImageOnlySliceVariation>;
/**
 * Primary content in TextAndImage → Primary
 *
 */
interface TextAndImageSliceDefaultPrimary {
    /**
     * Image field in *TextAndImage → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: text_and_image.primary.image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
    /**
     * Text Content field in *TextAndImage → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_and_image.primary.text_content
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    text_content: prismicT.RichTextField;
    /**
     * External Link field in *TextAndImage → Primary*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: text_and_image.primary.external_link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    external_link: prismicT.LinkField;
}
/**
 * Default variation for TextAndImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: `TextAndImage`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextAndImageSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<TextAndImageSliceDefaultPrimary>, never>;
/**
 * Slice variation for *TextAndImage*
 *
 */
type TextAndImageSliceVariation = TextAndImageSliceDefault;
/**
 * TextAndImage Shared Slice
 *
 * - **API ID**: `text_and_image`
 * - **Description**: `TextAndImage`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextAndImageSlice = prismicT.SharedSlice<"text_and_image", TextAndImageSliceVariation>;
/**
 * Primary content in TextOnly → Primary
 *
 */
interface TextOnlySliceDefaultPrimary {
    /**
     * Text Content field in *TextOnly → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_only.primary.text_content
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    text_content: prismicT.RichTextField;
    /**
     * External Link field in *TextOnly → Primary*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: text_only.primary.external_link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    external_link: prismicT.LinkField;
}
/**
 * Default variation for TextOnly Slice
 *
 * - **API ID**: `default`
 * - **Description**: `TextOnly`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextOnlySliceDefault = prismicT.SharedSliceVariation<"default", Simplify<TextOnlySliceDefaultPrimary>, never>;
/**
 * Slice variation for *TextOnly*
 *
 */
type TextOnlySliceVariation = TextOnlySliceDefault;
/**
 * TextOnly Shared Slice
 *
 * - **API ID**: `text_only`
 * - **Description**: `TextOnly`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextOnlySlice = prismicT.SharedSlice<"text_only", TextOnlySliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { BlogPostDocumentData, BlogPostDocumentDataSlicesSlice, BlogPostDocument, AllDocumentTypes, ImageOnlySliceDefaultPrimary, ImageOnlySliceDefault, ImageOnlySliceVariation, ImageOnlySlice, TextAndImageSliceDefaultPrimary, TextAndImageSliceDefault, TextAndImageSliceVariation, TextAndImageSlice, TextOnlySliceDefaultPrimary, TextOnlySliceDefault, TextOnlySliceVariation, TextOnlySlice };
    }
}
