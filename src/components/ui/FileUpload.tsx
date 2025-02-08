"use client"

import Link from "next/link"
import { useState, useRef } from "react"

interface FileUploadProps {
    label: string
    onFileSelect: (file: File | null) => void
}

export default function FileUpload({ label, onFileSelect }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)
        onFileSelect(selectedFile)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) {
            setFile(droppedFile)
            onFileSelect(droppedFile)
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleRemoveFile = () => {
        setFile(null)
        onFileSelect(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = "" // Reset input field
        }
    }

    return (
        <div className="flex flex-col space-y-4">
            <label className="text-lg font-semibold text-gray-700">{label}</label>

            <div
                className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg shadow-md cursor-pointer transition hover:border-blue-500 hover:bg-gray-100"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                {file ? (
                    <div className="flex flex-col items-center">
                        <p className="text-gray-600 text-sm">{file.name}</p>
                        <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="mt-2 text-red-500 hover:underline text-sm"
                        >
                            Remove File
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">Drag & drop a file here or click to upload</p>
                )}
            </div>
            <Link href="/ngosingup"></Link>
        </div>
    )
}
