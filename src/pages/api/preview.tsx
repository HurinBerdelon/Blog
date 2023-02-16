import { redirectToPreviewURL, setPreviewData } from "@prismicio/next";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "prismicio";

export default async function Preview(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const client = createClient({ req })
    setPreviewData({ req, res })
    await redirectToPreviewURL({ req, res, client })
}