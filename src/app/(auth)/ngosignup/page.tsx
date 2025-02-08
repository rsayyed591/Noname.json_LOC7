"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FileUpload from "@/components/ui/FileUpload"
import Link from "next/link"

export default function Page() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        darpanid: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pancard: null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (name: string, file: File | null) => {
        setFormData({ ...formData, [name]: file })
    }

    const handleSubmitStep1 = (e: React.FormEvent) => {
        e.preventDefault()
        setStep(2)
        fetch("https://b1d6-14-139-125-227.ngrok-free.app/auth/register_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                role: "ngo",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    localStorage.setItem("token", data.token)
                    setStep(2)
                } else {
                    alert("Authentication failed")
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    const handleSubmitStep2 = (e: React.FormEvent) => {
        e.preventDefault()
        const FormsData = new FormData()
        FormsData.append("darpanid", formData.darpanid)
        FormsData.append("address", `${formData.address1}, ${formData.address2}, ${formData.city}, ${formData.state}`)
        if (formData.pancard) {
            FormsData.append("pancard", formData.pancard as Blob)
        }
        FormsData.append("role", "ngo")
        // fetch("https://b1d6-14-139-125-227.ngrok-free.app/profile/register_user", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         email: formData.email,
        //         password: formData.password,
        //     }),
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         if (data) {
        //             localStorage.setItem("token", data.token)
        //             setStep(2)
        //         } else {
        //             alert("Authentication failed")
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error:", error)
        //     })
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
            <Link href="/resturantsingup"></Link>
        </div>
    )
}
