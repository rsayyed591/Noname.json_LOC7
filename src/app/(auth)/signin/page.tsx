"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import APIservice from "@/api/api"
import Link from "next/link"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type FormValues = z.infer<typeof formSchema>

export default function Page() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const router = useRouter()

    function onSubmit(values: FormValues) {
        const response = APIservice.loginUser(JSON.stringify({
            email: values.email,
            password: values.password,
        }))
        response.then((data:any) => {
            if (data) {
            localStorage.setItem("token", data.token)
            localStorage.setItem("role", data.role)
            router.push("/" + data.role)
            } else {
            alert("Authentication failed")
            }
        }).catch((error:any) => {
            console.error("Error:", error)
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full mt-4 bg-teal-200 hover:bg-teal-300">
                        Sign In
                    </Button>
                </form>
            </Form>
            <div className="text-center mt-4">
                <Link href="/ngosignup" className="text-teal-500 hover:underline">
                    Don't have an account? Sign up here
                </Link>
            </div>
        </div>
    )
}
