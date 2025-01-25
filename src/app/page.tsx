'use client'
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Button, Input, Modal, Upload } from "antd";
import { FaPlus } from "react-icons/fa";
import { RcFile } from "antd/es/upload";
import { toBase64 } from "@/util/Base64";
import toast, { Toaster } from 'react-hot-toast';
import toastTheme from "@/styles/ToastStyle";

export default function Home() {

  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [addFileName, setAddFileName] = useState<string>('')
  const [addFile, setAddFile] = useState<any>(null)

  const [sounds, setSounds] = useState<any[]>([])

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const res = await fetch('/api/v1/sounds')
    const data = await res.json()

    console.log(data)

    setSounds(data.sounds)
  }

  const play = (audio: any) => {
    new Audio(audio.file).play()
  }

  const uploadFile = async (file: RcFile) => {
    if(file.size < 100) return
    const b64File = await toBase64(file)
    setAddFile(b64File)
  }

  const add = async () => {

    if(!addFileName || !addFile || addFile.) 
      return

    const res = await fetch('/api/v1/sounds', {
      method: 'POST',
      body: JSON.stringify({
        name: addFileName,
        file: addFile
      })

    })

    const data = await res.json()
    console.log(data)

    if(data.message === "Successfully uploaded audio file!") {
      init()
      toast.success(data.message, toastTheme)
      setShowAddModal(false)

      setAddFileName('')
      setAddFile(null)
    }
    else {
      toast.error(data.message, toastTheme)
    }
  }

  return (
    <main>
      <Header />
      <div className='container'>
        <div className='sounds'>
          <div className='add'>
            <Button icon={<FaPlus />} onClick={() => setShowAddModal(true)}>Add</Button>
          </div>
          <div className='buttons'>
            {
              sounds.map((sound) => (
                <Button key={sound.id} onClick={() => play(sound)}>{sound.name}</Button>
              ))
            }
          </div>

        </div>
      </div>

      <Modal title='Add Sound' open={showAddModal} footer={null} onCancel={() => setShowAddModal(false)}>
        <Input placeholder='Name' onChange={(e) => setAddFileName(e.target.value)} />
        <Upload beforeUpload={uploadFile} accept=".mp3,.ogg" maxCount={1}>
          <Button className='upload-btn'>Upload File</Button>
        </Upload>

        <Button type="primary" onClick={() => add()} className='add-sound-btn'>Add</Button>
      </Modal>

      <Toaster />
    </main>
  )
}
