import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  label: string
}

export default function FileUpload({ onFileSelect, label }: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ${
        isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-8 w-8 text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">{label}</p>
      <p className="text-xs text-gray-400">Drag & drop or click to select</p>
    </div>
  )
}

