// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (req.method === 'POST') {

      res.status(200).json(req.body)
    } else {
      res.status(200).json({ name: 'John Doe' })
    }
    // Handle any other HTTP method
  }
 
