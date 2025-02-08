"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Package, Truck, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"

const projectname = "अन्नSampark"
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
})
const ngo = {ngoname:"DEDO NGO", ngopfp:"/ngo/pfp.jpg"}

const navItems = [
  { label: "Dashboard", icon: Home, href: "/ngo" },
  { label: "Select Order", icon: Package, href: "/ngo/select-order" },
  { label: "Delivery Agent", icon: Truck, href: "/ngo/delivery-agent" },
]

export default function NgoLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex bg-white shadow-lg w-64 flex-col h-screen sticky top-0">
        {/* Logo Section */}
        <div className="p-6 bg-gradient-to-b from-pink-50 to-transparent">
          <span
            className={cn(
              "block text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-blue-500/80 to-[#138808]",
              pacifico.className,
            )}
          >
            {projectname}
          </span>
        </div>

        {/* User Profile Section */}
        <div className="flex flex-col items-center p-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src={ngo.ngopfp} alt="User" />
            <AvatarFallback>NGO</AvatarFallback>
          </Avatar>
          <p className="mt-4 text-lg font-bold">Welcome, {ngo.ngoname}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center p-3 rounded-lg mb-2 transition-colors font-semibold text-md",
                item.href === pathname ? "bg-gray-100 text-blue-600" : "text-gray-700 hover:bg-gray-50",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Mobile Header */}
        {isMobile && (
          <header className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center justify-between">
            <span
              className={cn(
                "text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-blue-500/80 to-[#138808]",
                pacifico.className,
              )}
            >
              {projectname}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={ngo.ngopfp} alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </header>
        )}

        {/* Page Content */}
        <div className="p-6">{children}</div>

        {/* Mobile Navigation */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg",
                  item.href === pathname ? "text-blue-600" : "text-gray-700",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </main>
    </div>
  )
}

