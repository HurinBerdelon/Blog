import type { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { HyperLink } from "slices/RichTextComponents/HyperLink";
import { Heading4 } from "slices/RichTextComponents/Heading4";
import { Heading2 } from "slices/RichTextComponents/Heading2";
import { Heading3 } from "slices/RichTextComponents/Heading3";
import { Heading5 } from "slices/RichTextComponents/Heading5";
import { Heading6 } from "slices/RichTextComponents/Heading6";
import { ListItem } from "slices/RichTextComponents/ListItem";
import { List } from "slices/RichTextComponents/List";
import { OrderList } from "./OrderList";
import { OrderListItem } from "./OrderListItem";

export function RichTextComponent({ slice }: any): JSX.Element {
  return (
    <PrismicRichText
      components={{
        hyperlink: HyperLink,
        heading2: Heading2,
        heading3: Heading3,
        heading4: Heading4,
        heading5: Heading5,
        heading6: Heading6,
        list: List,
        listItem: ListItem,
        oList: OrderList,
        oListItem: OrderListItem,
      }}
      field={slice.primary.text_content}
    />
  );
}
