'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react'

const financialData = [
  { year: '2021', revenue: 5.41, operatingIncome: 0.85, margin: 15.7 },
  { year: '2022', revenue: 6.22, operatingIncome: 1.54, margin: 24.8 },
  { year: '2023', revenue: 6.72, operatingIncome: 0.88, margin: 13.1 },
]

const timelineData = [
  { year: '1897', event: '스위스 발레주 감펠에서 설립', type: 'foundation' },
  { year: '1970-2000', event: '바이오의약품 CDMO 사업 진출', type: 'expansion' },
  { year: '2017', event: '캡슈젤(Capsugel) 인수', type: 'acquisition' },
  { year: '2021', event: '특수화학 부문 매각으로 핵심사업 집중', type: 'restructure' },
  { year: '2024', event: '캡슐·건강기능 부문 사업 철수 발표', type: 'restructure' },
]

export default function CompanyOverview() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="company-overview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              기업 개요
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              125년 이상의 역사를 가진 론자 그룹은 시대 흐름에 따라 사업 포트폴리오를 재편하며 
              현재 글로벌 제약·바이오 산업의 핵심 파트너로 자리매김하였습니다.
            </p>
          </motion.div>

          {/* Key Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
          >
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-blue-900 mb-2">125+</h3>
              <p className="text-blue-700">년 역사</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-purple-900 mb-2">30+</h3>
              <p className="text-purple-700">글로벌 거점</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-900 mb-2">18,000</h3>
              <p className="text-green-700">임직원</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100">
              <DollarSign className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-orange-900 mb-2">67.17B</h3>
              <p className="text-orange-700">CHF 매출 (2023)</p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">기업 연혁</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                      <div className="text-sm font-semibold text-blue-600 mb-2">{item.year}</div>
                      <div className="text-gray-900 font-medium">{item.event}</div>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className={`w-4 h-4 rounded-full ${
                      item.type === 'foundation' ? 'bg-green-500' :
                      item.type === 'expansion' ? 'bg-blue-500' :
                      item.type === 'acquisition' ? 'bg-purple-500' :
                      'bg-orange-500'
                    } border-4 border-white shadow-lg`}></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Financial Charts */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">매출 및 영업이익 추이</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'revenue' ? `${value} billion CHF` : `${value} billion CHF`,
                      name === 'revenue' ? '매출' : '영업이익'
                    ]}
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" name="revenue" />
                  <Bar dataKey="operatingIncome" fill="#8B5CF6" name="operatingIncome" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">영업이익률 변화</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '영업이익률']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="margin" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div variants={itemVariants} className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">재무 현황 요약</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-gray-600">2023년 매출액</p>
                <p className="text-3xl font-bold text-blue-600">67.17억 CHF</p>
                <p className="text-sm text-green-600">전년 대비 +7.9%</p>
              </div>
              <div>
                <p className="text-gray-600">2023년 영업이익</p>
                <p className="text-3xl font-bold text-purple-600">8.80억 CHF</p>
                <p className="text-sm text-gray-500">영업이익률 13.1%</p>
              </div>
              <div>
                <p className="text-gray-600">투자 규모</p>
                <p className="text-3xl font-bold text-orange-600">17억 CHF</p>
                <p className="text-sm text-gray-500">매출의 25% (2023)</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 