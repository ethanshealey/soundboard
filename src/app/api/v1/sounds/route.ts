// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { NextRequest } from 'next/server'

export async function GET(request: Request) {
  const q = query(collection(db, 'sounds'))

  const qs = await getDocs(q)
  const sounds = qs.docs.map((item: any) => { return { ...item.data(), id: item.id } })

  return Response.json({ sounds })
}

export async function POST(request: NextRequest) {

  const body = await request.json()

  console.log(request.url)

  if(!request.url.includes('https://soundboard.ethanshealey.com')) return Response.json({ message: 'Invalid request' }, { status: 400 })

  await addDoc(collection(db, 'sounds'), {
    name: body.name,
    file: body.file
  })

  return Response.json({ message: 'Successfully uploaded audio file!' })
}