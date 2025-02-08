"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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

    function onSubmit(values: FormValues) {
        fetch("https://b1d6-14-139-125-227.ngrok-free.app/auth/login_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("role", data.role)
                    console.log("Authentication successful:", data.token)
                } else {
                    alert("Authentication failed")
                }
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}className="space-y-6 max-w-md mx-auto">
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
        </div>
    )
}
