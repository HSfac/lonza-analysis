'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ChevronDown, Building2, Globe, TrendingUp, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [currentText, setCurrentText] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const fullText = 'Global CDMO Leader'

  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])
  
  const springConfig = { damping: 20, stiffness: 300 }
  const x = useSpring(rotateX, springConfig)
  const y = useSpring(rotateY, springConfig)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setCurrentText(fullText.substring(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = clientX - innerWidth / 2
      const y = clientY - innerHeight / 2
      
      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const scrollToNext = () => {
    const nextSection = document.getElementById('company-overview')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Background Animation with Mouse Tracking */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          style={{
            x: useTransform(mouseX, [-500, 500], [-50, 50]),
            y: useTransform(mouseY, [-500, 500], [-50, 50]),
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          style={{
            x: useTransform(mouseX, [-500, 500], [50, -50]),
            y: useTransform(mouseY, [-500, 500], [50, -50]),
            bottom: '10%',
            right: '10%'
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 text-center text-white max-w-6xl mx-auto px-4"
        style={{
          rotateX: x,
          rotateY: y,
          transformStyle: "preserve-3d"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px rgb(59 130 246 / 0.5)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            Lonza Group
          </motion.h1>
          <div className="text-2xl md:text-4xl font-light mb-4 h-12 relative">
            <motion.span 
              className="border-r-2 border-white animate-pulse"
              animate={{
                color: ['#ffffff', '#3b82f6', '#8b5cf6', '#ffffff']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {currentText}
            </motion.span>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </div>
          <motion.p 
            className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            스위스 바젤에 본사를 둔 125년 역사의 글로벌 바이오의약품 위탁개발·생산(CDMO) 선도기업
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            { icon: Building2, title: "글로벌 네트워크", desc: "5개 대륙 30여 생산거점", color: "blue" },
            { icon: Globe, title: "임직원", desc: "전 세계 18,000명", color: "purple" },
            { icon: TrendingUp, title: "2023년 매출", desc: "67.17억 CHF", color: "green" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 cursor-pointer"
              whileHover={{ 
                scale: 1.1,
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                background: "rgba(255, 255, 255, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: 0.6 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className={`w-12 h-12 mb-4 text-${item.color}-300`} />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className={`text-sm text-${item.color}-200`}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 1.2,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)"
          }}
          whileTap={{ scale: 0.9 }}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">분석 보고서 보기</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="ml-2 relative z-10"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
        onClick={scrollToNext}
      >
        <motion.div
          className="relative"
          whileHover={{ 
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
            borderRadius: "50%"
          }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
          <motion.div
            className="absolute inset-0 border-2 border-white/30 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
} 