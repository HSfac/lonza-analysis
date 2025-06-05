'use client'

import React from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Shield, Zap, Target, AlertTriangle, TrendingUp, Users, Globe, Award, Search, Lightbulb, Star, Activity } from 'lucide-react'

const swotData = {
  strengths: {
    title: '강점',
    icon: Shield,
    color: 'green',
    items: [
      '글로벌 CDMO 업계 1위 기업으로서의 신뢰성과 브랜드 파워',
      '120년이 넘는 제조공정 전문성과 품질 관리 역량',
      '단클론항체 대량생산 분야 세계 최대 수준의 생산능력',
      '원스톱 서비스 제공으로 고객의 공급망 단순화',
      'BBB+급 투자등급의 재무적 안정성'
    ]
  },
  weaknesses: {
    title: '약점',
    icon: AlertTriangle,
    color: 'orange',
    items: [
      '스위스 본사로 인한 높은 고정비용 구조',
      '후발주자 대비 원가경쟁력 열위',
      '캡슐 사업 등 비핵심 부문의 성장 드래그',
      '바이오텍 투자위축으로 인한 초기 단계 수주 감소',
      '일부 부문 업황 부진의 전체 실적 파급 효과'
    ]
  },
  opportunities: {
    title: '기회',
    icon: Target,
    color: 'blue',
    items: [
      '바이오의약품 시장의 지속적 성장과 아웃소싱 수요 증대',
      '신약 파이프라인 다변화로 인한 전문 위탁서비스 수요 확대',
      '포트폴리오 재편과 M&A를 통한 성장 기회',
      '정부의 바이오산업 지원 정책 확대',
      '지역별 의약품 공급망 강화 정책의 수혜'
    ]
  },
  threats: {
    title: '위협',
    icon: Zap,
    color: 'red',
    items: [
      '경쟁 심화와 잠재적 공급과잉으로 인한 마진 압박',
      '거시경제 및 지정학적 리스크',
      '품질 또는 안전사고 발생 가능성',
      '환율 변동성과 무역분쟁 영향',
      '제약사들의 자체 생산 역량 확충 가능성'
    ]
  }
}

const rdInvestmentData = [
  { year: '2020', rd: 5.2, capex: 22.0 },
  { year: '2021', rd: 5.8, capex: 25.2 },
  { year: '2022', rd: 6.5, capex: 30.5 },
  { year: '2023', rd: 7.1, capex: 25.3 },
]

const competitiveRadarData = [
  { subject: '생산능력', lonza: 90, samsung: 85, catalent: 70 },
  { subject: '기술력', lonza: 95, samsung: 80, catalent: 75 },
  { subject: '글로벌 네트워크', lonza: 88, samsung: 60, catalent: 85 },
  { subject: '고객기반', lonza: 92, samsung: 70, catalent: 80 },
  { subject: '재무안정성', lonza: 85, samsung: 90, catalent: 65 },
  { subject: '혁신능력', lonza: 87, samsung: 75, catalent: 70 }
]

function FloatingParticle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
      initial={{
        x: Math.random() * 400,
        y: Math.random() * 400,
      }}
      animate={{
        x: Math.random() * 400,
        y: Math.random() * 400,
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  )
}

export default function MarketPosition() {
  const [activeSwot, setActiveSwot] = useState<keyof typeof swotData>('strengths')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [chartRef, chartInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])
  
  const springConfig = { damping: 25, stiffness: 400 }
  const x = useSpring(rotateX, springConfig)
  const y = useSpring(rotateY, springConfig)

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  }

  const cardHover = {
    rest: { scale: 1, rotateY: 0, z: 0 },
    hover: { 
      scale: 1.05, 
      rotateY: 5, 
      z: 50,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  const swotColors = {
    green: { bg: 'from-green-50 to-emerald-100', border: 'border-green-200', text: 'text-green-600', button: 'bg-green-600' },
    orange: { bg: 'from-orange-50 to-yellow-100', border: 'border-orange-200', text: 'text-orange-600', button: 'bg-orange-600' },
    blue: { bg: 'from-blue-50 to-indigo-100', border: 'border-blue-200', text: 'text-blue-600', button: 'bg-blue-600' },
    red: { bg: 'from-red-50 to-pink-100', border: 'border-red-200', text: 'text-red-600', button: 'bg-red-600' }
  }

  const particles = Array.from({ length: 15 }, (_, i) => i)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Floating Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <FloatingParticle key={particle} delay={particle * 0.5} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            rotateX: x,
            rotateY: y,
            transformStyle: "preserve-3d"
          }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              whileHover={{ 
                scale: 1.05,
                background: "linear-gradient(45deg, #3B82F6, #8B5CF6, #10B981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              시장 내 포지션 및 전략
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              론자 그룹의 시장 지위와 경쟁 우위를 SWOT 분석과 R&D 전략을 통해 살펴봅니다.
            </motion.p>
          </motion.div>

          {/* Enhanced Market Position Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            {[
              { icon: Award, title: "#1", subtitle: "글로벌 CDMO 매출 순위", color: "blue" },
              { icon: Globe, title: "22%", subtitle: "시장 점유율", color: "purple" },
              { icon: Users, title: "790+", subtitle: "고객사 (2022)", color: "green" },
              { icon: TrendingUp, title: "375", subtitle: "신규 프로젝트 (2022)", color: "orange" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-8 bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-xl border border-${stat.color}-200 cursor-pointer relative overflow-hidden`}
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ 
                    rotateY: 360,
                    scale: 1.2
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <stat.icon className={`w-12 h-12 text-${stat.color}-600 mx-auto mb-4`} />
                </motion.div>
                
                <motion.h3 
                  className={`text-3xl font-bold text-${stat.color}-900 mb-2 relative z-10`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.title}
                </motion.h3>
                <p className={`text-${stat.color}-700 relative z-10`}>{stat.subtitle}</p>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute top-2 right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Star className={`w-4 h-4 text-${stat.color}-400/50`} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced SWOT Analysis */}
          <motion.div variants={itemVariants} className="mb-20">
            <motion.h3 
              className="text-3xl font-bold text-gray-900 mb-12 text-center"
              whileHover={{ scale: 1.05 }}
            >
              SWOT 분석
            </motion.h3>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              variants={containerVariants}
            >
              {Object.entries(swotData).map(([key, data], index) => {
                const IconComponent = data.icon
                const isActive = activeSwot === key
                return (
                  <motion.button
                    key={key}
                    onClick={() => setActiveSwot(key as keyof typeof swotData)}
                    className={`flex items-center px-6 py-4 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? `${swotColors[data.color as keyof typeof swotColors].button} text-white shadow-lg scale-105`
                        : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-5 h-5 mr-2" />
                    </motion.div>
                    {data.title}
                    
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </motion.div>

            <motion.div
              key={activeSwot}
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className={`bg-gradient-to-br ${swotColors[swotData[activeSwot].color as keyof typeof swotColors].bg} p-8 rounded-2xl border ${swotColors[swotData[activeSwot].color as keyof typeof swotColors].border} relative overflow-hidden`}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <motion.div 
                    className="flex items-center mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {React.createElement(swotData[activeSwot].icon, { 
                        className: `w-12 h-12 ${swotColors[swotData[activeSwot].color as keyof typeof swotColors].text} mr-4` 
                      })}
                    </motion.div>
                    <h4 className="text-3xl font-bold text-gray-900">{swotData[activeSwot].title}</h4>
                  </motion.div>
                  
                  <div className="space-y-4">
                    {swotData[activeSwot].items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start group"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div 
                          className={`w-2 h-2 ${swotColors[swotData[activeSwot].color as keyof typeof swotColors].button} rounded-full mt-3 mr-4 flex-shrink-0`}
                          whileHover={{ scale: 1.5 }}
                        />
                        <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  variants={containerVariants}
                >
                  {Object.entries(swotData).map(([key, data], index) => {
                    const IconComponent = data.icon
                    const isCurrentActive = key === activeSwot
                    return (
                      <motion.div
                        key={key}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          isCurrentActive
                            ? `${swotColors[data.color as keyof typeof swotColors].border} bg-white/80 scale-105`
                            : 'border-gray-200 bg-white/50 hover:bg-white/80'
                        }`}
                        whileHover={{ 
                          scale: isCurrentActive ? 1.1 : 1.05,
                          rotateY: 5
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                        onClick={() => setActiveSwot(key as keyof typeof swotData)}
                      >
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <IconComponent className={`w-8 h-8 ${swotColors[data.color as keyof typeof swotColors].text} mb-3`} />
                        </motion.div>
                        <h5 className="font-semibold text-gray-900 text-sm">{data.title}</h5>
                        <p className="text-xs text-gray-600 mt-1">{data.items.length}개 요소</p>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Charts Section */}
          <motion.div 
            ref={chartRef}
            variants={itemVariants} 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={chartInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1 }}
              />
              
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Search className="w-6 h-6 mr-2 text-blue-600" />
                </motion.div>
                R&D 투자 현황
              </motion.h3>
              
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={rdInvestmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="year" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}%`,
                      name === 'rd' ? 'R&D 투자율' : 'CAPEX 투자율'
                    ]}
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="rd" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="capex" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              
              <motion.div 
                className="mt-4 text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={chartInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 }}
              >
                <p>• R&D: 매출 대비 5-7% 지속 투자</p>
                <p>• CAPEX: 매출 대비 25-30% 공격적 투자</p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"
                initial={{ width: 0 }}
                animate={chartInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              
              <motion.h3 
                className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Activity className="w-6 h-6 mr-2 text-green-600" />
                </motion.div>
                경쟁사 비교 분석
              </motion.h3>
              
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={competitiveRadarData}>
                  <PolarGrid stroke="#e0e7ff" />
                  <PolarAngleAxis dataKey="subject" className="text-sm" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                  <Radar name="Lonza" dataKey="lonza" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} strokeWidth={2} />
                  <Radar name="Samsung" dataKey="samsung" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} strokeWidth={2} />
                  <Radar name="Catalent" dataKey="catalent" stroke="#10B981" fill="#10B981" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              
              <motion.div 
                className="mt-4 flex justify-center space-x-6 text-sm"
                initial={{ opacity: 0 }}
                animate={chartInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Lonza</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span>Samsung</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Catalent</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Strategic Insights */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200 relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-100/50 to-purple-100/50"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1 }}
            />
            
            <motion.h3 
              className="text-2xl font-bold text-gray-900 mb-6 flex items-center relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Lightbulb className="w-6 h-6 mr-2 text-indigo-600" />
              </motion.div>
              전략적 인사이트
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                {
                  title: "시장 리더십",
                  content: "글로벌 CDMO 시장에서 1위 지위를 유지하며 22%의 시장 점유율 확보",
                  icon: Award
                },
                {
                  title: "기술 혁신",
                  content: "R&D 투자 지속 확대로 차세대 바이오의약품 생산 기술 선도",
                  icon: Lightbulb
                },
                {
                  title: "성장 동력",
                  content: "아웃소싱 시장 확대와 바이오의약품 수요 증가로 지속 성장 기반 확보",
                  icon: TrendingUp
                }
              ].map((insight, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 1 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <insight.icon className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
                  </motion.div>
                  <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{insight.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 