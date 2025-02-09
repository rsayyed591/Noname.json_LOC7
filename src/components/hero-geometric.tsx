"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export default function HeroGeometric({
  title1 = "Welcome to",
  title2 = "अन्नSampark",
}: {
  title1?: string
  title2?: string
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }} // Replace with your image path
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF9933]/50 via-white/70 to-[#138808]/50 opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight text-white drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-black to-black/80">{title1}</span>
            <br />
            <span
              className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-blue-500/80 to-[#138808]",
                pacifico.className,
              )}
            >
              {title2}
            </span>
          </h1>
        </motion.div>

        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
          <p className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-lg mb-8 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
            Donate Food With Ease. <br /> Make a Difference Today!
          </p>
        </motion.div>

        <motion.div 
          custom={3} 
          variants={fadeUpVariants} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full"
        >
          <Link href="/ngosignup">
            <Button className="px-8 py-3 text-lg font-semibold rounded-full bg-[#138808] hover:bg-[#0d6604] text-white shadow-xl transition-all duration-300">
              Get Started as NGO
            </Button>
          </Link>
          <Link href="/restaurantsignup">
            <Button className="px-8 py-3 text-lg font-semibold rounded-full bg-[#880808] hover:bg-[#660404] text-white shadow-xl transition-all duration-300">
              Get Started as Restaurant
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
