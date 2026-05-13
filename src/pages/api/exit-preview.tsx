import { NextApiRequest, NextApiResponse } from "next";

// Preview routes are handled by @prismicio/next in the App Router (Phase 2).
export default function ExitPreview(_req: NextApiRequest, res: NextApiResponse): void {
    res.redirect('/')
}
