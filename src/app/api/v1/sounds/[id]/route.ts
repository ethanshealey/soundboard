// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const id = (await params)?.id

    const q = query(collection(db, 'sounds'))

    const qs = await getDocs(q)
    const sounds = qs.docs.map((item: any) => { return { ...item.data(), id: item.id } })

    const sound = sounds.find((sound: any) => sound.id === id)

    return Response.json({ sound })
}
