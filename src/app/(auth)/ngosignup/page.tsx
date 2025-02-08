"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FileUpload from "@/components/ui/FileUpload"
import Link from "next/link"
import APIservice from "@/api/api"
import { useRouter } from "next/navigation"
export default function Page() {
    const router = useRouter()   
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        darpanid: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        name:"",
        pancard: null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (name: string, file: File | null) => {
        setFormData({ ...formData, [name]: file })
    }

    const handleSubmitStep1 = async (e: React.FormEvent) => {
        e.preventDefault()
        setStep(2)
        const response = await APIservice.registerUser(JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: "ngo",
        }))
        localStorage.setItem("token", response.data.token)
        console.log(localStorage.getItem("token"))
        setStep(2)
    }

    const handleSubmitStep2 = (e: React.FormEvent) => {
        e.preventDefault()
        const FormsData = new FormData()
        FormsData.append("darpanId", `${formData.darpanid}`)
        FormsData.append("name", `${formData.name}`)
        FormsData.append("address", `${formData.address1}, ${formData.address2}, ${formData.city}, ${formData.state}`)
        if (formData.pancard) {
            FormsData.append("pancard", formData.pancard)
        }
        FormsData.append("role", "ngo")
        console.log("Final Form Data:", FormsData)
        const token = localStorage.getItem("token")
        console.log("Token:", token)
        const response = APIservice.profileDataNGO(FormsData,token)
        response.then((data:any) => {
            if (data) {
                router.push("/ngo")
            setStep(2)
            } else {
            alert("Authentication failed")
            }
        }).catch((error:any) => {
            console.error("Error:", error)
        })
        console.log("Final Form Data:", FormsData)

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    {step === 1 ? "Sign In" : "NGO Details"}
                </h1>

                {step === 1 ? (
                    <form onSubmit={handleSubmitStep1} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                        </div>
                        <Button type="submit" className="w-full bg-teal-200 hover:bg-teal-100 text-white py-2 rounded-md transition">
                            Continue
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitStep2} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <Input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Darpan ID</label>
                            <Input type="text" name="darpanid" placeholder="Enter Darpan ID" value={formData.darpanid} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                            <Input type="text" name="address1" placeholder="Enter Address Line 1" value={formData.address1} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
                            <Input type="text" name="address2" placeholder="Enter Address Line 2" value={formData.address2} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <Input type="text" name="city" placeholder="Enter City" value={formData.city} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">State</label>
                            <Input type="text" name="state" placeholder="Enter State" value={formData.state} onChange={handleChange} />
                        </div>

                        <div>
                            <FileUpload onFileSelect={(file) => handleFileChange("pancard", file)} label="Upload PAN Card" />
                        </div>

                        <Button type="submit" className="w-full bg-teal-200 hover:bg-teal-100 text-white py-2 rounded-md transition">
                            Submit
                        </Button>
                    </form>
                )}
            </div>
            <div className="text-center mt-4">
                <Link href="/restaurantsignup" className="text-teal-500 hover:underline">
                    Don't have an account? Sign up here
                </Link>
            </div>
        </div>
    )
}
