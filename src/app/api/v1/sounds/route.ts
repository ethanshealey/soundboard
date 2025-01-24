// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'

export async function GET(request: Request) {
  const q = query(collection(db, 'sounds'))

  const qs = await getDocs(q)
  const sounds = qs.docs.map((item: any) => { return { ...item.data(), id: item.id } })

  return Response.json({ sounds })
}

export async function POST(request: Request) {
  const body = await request.json()

  await addDoc(collection(db, 'sounds'), {
    name: body.name,
    file: body.file
  })

  return Response.json({ message: 'Successfully uploaded audio file!' })
}

//git remote add origin git@github.com:ethanshealey/soundboard.git