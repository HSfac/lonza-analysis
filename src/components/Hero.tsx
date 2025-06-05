'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Building2, Globe, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [currentText, setCurrentText] = useState('')
  const fullText = 'Global CDMO Leader'
  
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

  const scrollToNext = () => {
    const nextSection = document.getElementById('company-overview')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Lonza Group
          </h1>
          <div className="text-2xl md:text-4xl font-light mb-4 h-12">
            <span className="border-r-2 border-white animate-pulse">
              {currentText}
            </span>
          </div>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            스위스 바젤에 본사를 둔 125년 역사의 글로벌 바이오의약품 위탁개발·생산(CDMO) 선도기업
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <Building2 className="w-12 h-12 mb-4 text-blue-300" />
            <h3 className="text-lg font-semibold mb-2">글로벌 네트워크</h3>
            <p className="text-sm text-blue-200">5개 대륙 30여 생산거점</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <Globe className="w-12 h-12 mb-4 text-purple-300" />
            <h3 className="text-lg font-semibold mb-2">임직원</h3>
            <p className="text-sm text-purple-200">전 세계 18,000명</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <TrendingUp className="w-12 h-12 mb-4 text-green-300" />
            <h3 className="text-lg font-semibold mb-2">2023년 매출</h3>
            <p className="text-sm text-green-200">67.17억 CHF</p>
          </div>
        </motion.div>

        <motion.button
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          분석 보고서 보기
          <ChevronDown className="ml-2 w-5 h-5" />
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  )
} 