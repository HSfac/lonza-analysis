'use client'

import { motion, useAnimationControls, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Calendar, MapPin, Users, DollarSign, TrendingUp, Building, Award } from 'lucide-react'
import { useEffect, useState } from 'react'

const financialData = [
  { year: '2021', revenue: 5.41, operatingIncome: 0.85, margin: 15.7 },
  { year: '2022', revenue: 6.22, operatingIncome: 1.54, margin: 24.8 },
  { year: '2023', revenue: 6.72, operatingIncome: 0.88, margin: 13.1 },
]

const timelineData = [
  { year: '1897', event: '스위스 발레주 감펠에서 설립', type: 'foundation', icon: Building },
  { year: '1970-2000', event: '바이오의약품 CDMO 사업 진출', type: 'expansion', icon: TrendingUp },
  { year: '2017', event: '캡슈젤(Capsugel) 인수', type: 'acquisition', icon: Award },
  { year: '2021', event: '특수화학 부문 매각으로 핵심사업 집중', type: 'restructure', icon: Building },
  { year: '2024', event: '캡슐·건강기능 부문 사업 철수 발표', type: 'restructure', icon: TrendingUp },
]

function CountUpAnimation({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true)
      const startTime = Date.now()
      const endTime = startTime + duration * 1000

      const updateCount = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (endTime - startTime), 1)
        setCount(Math.floor(progress * end))

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        }
      }

      requestAnimationFrame(updateCount)
    }
  }, [inView, end, duration, isVisible])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function CompanyOverview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [chartRef, chartInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  }

  const cardHoverVariants = {
    rest: { scale: 1, rotateY: 0 },
    hover: { 
      scale: 1.05, 
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  return (
    <section id="company-overview" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              whileHover={{ 
                scale: 1.05,
                background: "linear-gradient(45deg, #3B82F6, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              기업 개요
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
              125년 이상의 역사를 가진 론자 그룹은 시대 흐름에 따라 사업 포트폴리오를 재편하며 
              현재 글로벌 제약·바이오 산업의 핵심 파트너로 자리매김하였습니다.
            </motion.p>
          </motion.div>

          {/* Key Stats with Enhanced Animations */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
          >
            {[
              { icon: Calendar, title: "125+", subtitle: "년 역사", color: "blue", number: 125 },
              { icon: MapPin, title: "30+", subtitle: "글로벌 거점", color: "purple", number: 30 },
              { icon: Users, title: "18,000", subtitle: "임직원", color: "green", number: 18000 },
              { icon: DollarSign, title: "67.17B", subtitle: "CHF 매출 (2023)", color: "orange", number: 67.17 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`text-center p-8 bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-xl border border-${stat.color}-200 cursor-pointer relative overflow-hidden`}
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <stat.icon className={`w-12 h-12 text-${stat.color}-600 mx-auto mb-4`} />
                </motion.div>
                <motion.h3 
                  className={`text-3xl font-bold text-${stat.color}-900 mb-2 relative z-10`}
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.title.includes('18,000') ? (
                    <CountUpAnimation end={stat.number} suffix="" />
                  ) : stat.title.includes('125') ? (
                    <><CountUpAnimation end={stat.number} />+</>
                  ) : stat.title.includes('30') ? (
                    <><CountUpAnimation end={stat.number} />+</>
                  ) : (
                    <><CountUpAnimation end={stat.number} />B</>
                  )}
                </motion.h3>
                <p className={`text-${stat.color}-700 relative z-10`}>{stat.subtitle}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Timeline */}
          <motion.div variants={itemVariants} className="mb-20">
            <motion.h3 
              className="text-3xl font-bold text-gray-900 mb-12 text-center"
              whileHover={{ scale: 1.05 }}
            >
              기업 연혁
            </motion.h3>
            <div className="relative">
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 to-purple-600"
                initial={{ height: 0 }}
                animate={inView ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 2, delay: 1 }}
              />
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div 
                    className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                    initial={{ 
                      opacity: 0, 
                      x: index % 2 === 0 ? 50 : -50,
                      rotateY: index % 2 === 0 ? 15 : -15
                    }}
                    animate={inView ? { 
                      opacity: 1, 
                      x: 0,
                      rotateY: 0
                    } : {}}
                    transition={{ delay: 1.2 + index * 0.3 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: index % 2 === 0 ? -5 : 5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 relative overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={inView ? { width: "100%" } : { width: 0 }}
                        transition={{ delay: 1.5 + index * 0.3, duration: 0.5 }}
                      />
                      <motion.div className="flex items-center gap-3 mb-2">
                        <item.icon className="w-5 h-5 text-blue-600" />
                        <div className="text-sm font-semibold text-blue-600">{item.year}</div>
                      </motion.div>
                      <div className="text-gray-900 font-medium">{item.event}</div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="relative z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 1.2 + index * 0.3, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.3, rotate: 180 }}
                  >
                    <div className={`w-4 h-4 rounded-full ${
                      item.type === 'foundation' ? 'bg-green-500' :
                      item.type === 'expansion' ? 'bg-blue-500' :
                      item.type === 'acquisition' ? 'bg-purple-500' :
                      'bg-orange-500'
                    } border-4 border-white shadow-lg relative`}>
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{ 
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.4)",
                            "0 0 0 10px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0.4)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Financial Charts */}
          <motion.div 
            ref={chartRef}
            variants={itemVariants} 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={chartInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1 }}
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-6">매출 및 영업이익 추이</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="year" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? `${value} billion CHF` : `${value} billion CHF`,
                      name === 'revenue' ? '매출' : '영업이익'
                    ]}
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" name="revenue" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="operatingIncome" fill="#8B5CF6" name="operatingIncome" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={chartInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-6">영업이익률 변화</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="year" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '영업이익률']}
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="margin" 
                    stroke="#10B981" 
                    strokeWidth={4}
                    dot={{ 
                      fill: '#10B981', 
                      strokeWidth: 3, 
                      r: 8,
                      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                    }}
                    activeDot={{ 
                      r: 10, 
                      fill: '#10B981',
                      stroke: '#ffffff',
                      strokeWidth: 3
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>

          {/* Enhanced Summary */}
          <motion.div 
            variants={itemVariants} 
            className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">재무 현황 요약</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center relative z-10">
              {[
                { label: "2023년 매출액", value: "67.17억 CHF", change: "전년 대비 +7.9%", color: "blue" },
                { label: "2023년 영업이익", value: "8.80억 CHF", change: "영업이익률 13.1%", color: "purple" },
                { label: "투자 규모", value: "17억 CHF", change: "매출의 25% (2023)", color: "orange" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="text-gray-600">{item.label}</p>
                  <motion.p 
                    className={`text-3xl font-bold text-${item.color}-600`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.value}
                  </motion.p>
                  <p className="text-sm text-green-600">{item.change}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 