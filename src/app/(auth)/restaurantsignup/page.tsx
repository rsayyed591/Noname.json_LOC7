"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FileUpload from "@/components/ui/FileUpload"
import APIservice from "@/api/api"
import { useRouter } from "next/navigation"
import Link from "next/link"
export default function Page() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        restaurantName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        gstin: "",
        pancard: null,
        restaurantImage: null,
        fssaiLicense: null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (name: string, file: File | null) => {
        setFormData({ ...formData, [name]: file })
    }

    const handleSubmitStep1 = async(e: React.FormEvent) => {
        e.preventDefault()

        const response = APIservice.registerUser(JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: "restaurant",
        }))
        response.then((data:any) => {

            if (data.token) {
            localStorage.setItem("token", data.token)
            const t=localStorage.getItem("token")
            console.log(t)
            setStep(2)
            } else {
            alert("Authentication failed")
            }
        }).catch((error:any) => {
            console.error("Error:", error)
        })
        setStep(2)
    }

    const handleSubmitStep2 = (e: React.FormEvent) => {
        e.preventDefault()
        const FormsData = new FormData()
        FormsData.append("name", formData.restaurantName)
        FormsData.append("gstin", formData.gstin)
        FormsData.append("address", `${formData.address1}, ${formData.address2}, ${formData.city}, ${formData.state}`)
        if (formData.pancard) {
            FormsData.append("pancard", formData.pancard as Blob)
        }
        if (formData.restaurantImage) {
            FormsData.append("image", `${formData.restaurantImage}`)
        }
        if (formData.fssaiLicense) {
            FormsData.append("fssaiLicense", formData.fssaiLicense)
        }
        const token = localStorage.getItem("token")
        
        const response = APIservice.profileDataNGO(FormsData,token)
        response.then((data:any) => {
            if (data) {
                router.push("/restaurant")
            setStep(2)
            } else {
            alert("Authentication failed")
            }
        }).catch((error:any) => {
            console.error("Error:", error)
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    {step === 1 ? "Sign In" : "Restaurant Details"}
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
                            <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
                            <Input type="text" name="restaurantName" placeholder="Enter Restaurant Name" value={formData.restaurantName} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                            <Input type="text" name="address1" placeholder="Enter Address Line 1" value={formData.address1} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address Line 2 (Optional)</label>
                            <Input type="text" name="address2" placeholder="Enter Address Line 2" value={formData.address2} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <Input type="text" name="city" placeholder="Enter City" value={formData.city} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">State</label>
                                <Input type="text" name="state" placeholder="Enter State" value={formData.state} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">GSTIN Number</label>
                            <Input type="text" name="gstin" placeholder="Enter GSTIN Number" value={formData.gstin} onChange={handleChange} />
                        </div>

                        <div className="space-y-3">
                            <FileUpload onFileSelect={(file) => handleFileChange("pancard", file)} label="Upload PAN Card" />
                            <FileUpload onFileSelect={(file) => handleFileChange("restaurantImage", file)} label="Upload Restaurant Image" />
                            <FileUpload onFileSelect={(file) => handleFileChange("fssaiLicense", file)} label="Upload FSSAI License (PDF)" />
                        </div>
                        

                        <Button type="submit" className="w-full bg-teal-100 hover:bg-teal-200 text-white py-2 rounded-md transition">
                            Submit
                        </Button>
                    </form>
                )}
                <div className="text-center mt-4">
                            <Link href="/ngosignup" className="text-teal-500 hover:underline">Sign up as NGO</Link>
                        </div>
            </div>
        </div>
    )
}
