'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Area, PieChart, Pie, Cell } from 'recharts'
import { Rocket, Target, AlertCircle, TrendingUp, Building, Globe2, DollarSign, Users, Zap, Shield } from 'lucide-react'

const growthProjectionData = [
  { year: '2023', revenue: 6.7, projected_revenue: 6.7, ebitda_margin: 31.2 },
  { year: '2024', revenue: 7.2, projected_revenue: 7.5, ebitda_margin: 32.0 },
  { year: '2025', revenue: 8.1, projected_revenue: 8.4, ebitda_margin: 32.8 },
  { year: '2026', revenue: 9.2, projected_revenue: 9.5, ebitda_margin: 33.2 },
  { year: '2027', revenue: 10.4, projected_revenue: 10.8, ebitda_margin: 33.5 },
  { year: '2028', revenue: 11.8, projected_revenue: 12.2, ebitda_margin: 34.0 }
]

const investmentPlanData = [
  { category: '생산능력 확대', amount: 35, color: '#3B82F6' },
  { category: '신기술 개발', amount: 25, color: '#8B5CF6' },
  { category: 'M&A 및 제휴', amount: 20, color: '#10B981' },
  { category: '디지털화', amount: 12, color: '#F59E0B' },
  { category: '지속가능성', amount: 8, color: '#EF4444' }
]

const riskFactors = [
  {
    category: '경쟁 리스크',
    level: 'High',
    color: 'red',
    factors: [
      '삼성바이오로직스, 우시바이오 등 후발주자의 공격적 확장',
      '중국·인도계 업체의 저가 공세',
      '공급과잉으로 인한 단가 경쟁 심화'
    ]
  },
  {
    category: '운영 리스크',
    level: 'Medium',
    color: 'orange',
    factors: [
      '원부자재 공급망 차질 가능성',
      '신규 시설 가동 지연 리스크',
      '품질 관리 및 규제 준수 이슈'
    ]
  },
  {
    category: '외부 환경',
    level: 'Medium',
    color: 'yellow',
    factors: [
      '거시경제 침체 및 금리 상승',
      '지정학적 갈등과 무역분쟁',
      '환율 변동성 확대'
    ]
  },
  {
    category: '기술 변화',
    level: 'Low',
    color: 'green',
    factors: [
      '제약사들의 내부 생산 회귀',
      '생산공정 자동화로 인한 역할 축소',
      '신기술 등장에 따른 기존 서비스 대체'
    ]
  }
]

const expansionPlans = [
  {
    title: '핵심사업 집중',
    description: 'One Lonza 전략으로 3대 플랫폼 중심 조직 재편',
    timeline: '2024-2025',
    investment: '조직 효율화',
    icon: Target,
    status: 'in-progress'
  },
  {
    title: '생산능력 대폭 확대',
    description: '스위스 Stein, 미국 Vacaville 등 신규 시설 가동',
    timeline: '2024-2026',
    investment: '20억+ CHF',
    icon: Building,
    status: 'planned'
  },
  {
    title: '신규 서비스 확장',
    description: 'mRNA, 플라스미드 DNA, 자동화 솔루션 상용화',
    timeline: '2025-2027',
    investment: '15억 CHF',
    icon: Rocket,
    status: 'development'
  },
  {
    title: '전략적 M&A',
    description: '기술 보완 및 시장 확대를 위한 선택적 인수',
    timeline: '2024-2028',
    investment: '10억+ CHF',
    icon: Globe2,
    status: 'evaluation'
  }
]

export default function FutureOutlook() {
  const [activeRisk, setActiveRisk] = useState(0)
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

  const riskColors = {
    red: { bg: 'from-red-50 to-red-100', border: 'border-red-300', text: 'text-red-700' },
    orange: { bg: 'from-orange-50 to-orange-100', border: 'border-orange-300', text: 'text-orange-700' },
    yellow: { bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-300', text: 'text-yellow-700' },
    green: { bg: 'from-green-50 to-green-100', border: 'border-green-300', text: 'text-green-700' }
  }

  const statusColors = {
    'in-progress': 'bg-blue-100 text-blue-800',
    'planned': 'bg-purple-100 text-purple-800',
    'development': 'bg-green-100 text-green-800',
    'evaluation': 'bg-orange-100 text-orange-800'
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
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
              미래 전망 및 도전 과제
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              론자 그룹의 중장기 성장 전략과 예상되는 도전 과제를 종합적으로 분석합니다.
            </p>
          </motion.div>

          {/* Growth Targets */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">중기 성장 목표</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 text-center">
                <TrendingUp className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h4 className="text-2xl font-bold text-blue-900">11-13%</h4>
                <p className="text-blue-700 text-sm">연평균 매출 성장률</p>
                <p className="text-xs text-blue-600 mt-1">(2024-2028)</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 text-center">
                <DollarSign className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h4 className="text-2xl font-bold text-purple-900">32-34%</h4>
                <p className="text-purple-700 text-sm">CORE EBITDA 마진</p>
                <p className="text-xs text-purple-600 mt-1">목표 유지</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 text-center">
                <Building className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h4 className="text-2xl font-bold text-green-900">50억+</h4>
                <p className="text-green-700 text-sm">CHF 총 투자규모</p>
                <p className="text-xs text-green-600 mt-1">(2024-2026)</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 text-center">
                <Users className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                <h4 className="text-2xl font-bold text-orange-900">20,000+</h4>
                <p className="text-orange-700 text-sm">목표 임직원 수</p>
                <p className="text-xs text-orange-600 mt-1">(2028년)</p>
              </div>
            </div>

            {/* Growth Projection Chart */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">매출 성장 전망</h4>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={growthProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name.includes('margin') ? `${value}%` : `${value} billion CHF`,
                      name === 'revenue' ? '실제 매출' : 
                      name === 'projected_revenue' ? '목표 매출' : 'EBITDA 마진'
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" fillOpacity={0.8} />
                  <Line yAxisId="left" type="monotone" dataKey="projected_revenue" stroke="#8B5CF6" strokeWidth={3} strokeDasharray="5 5" />
                  <Line yAxisId="right" type="monotone" dataKey="ebitda_margin" stroke="#10B981" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Strategic Expansion Plans */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">전략적 확장 계획</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {expansionPlans.map((plan, index) => {
                const IconComponent = plan.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        <IconComponent className="w-12 h-12 text-blue-600 mr-4" />
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{plan.title}</h4>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${statusColors[plan.status as keyof typeof statusColors]}`}>
                            {plan.status === 'in-progress' ? '진행 중' :
                             plan.status === 'planned' ? '계획됨' :
                             plan.status === 'development' ? '개발 중' : '검토 중'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{plan.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-500">타임라인: </span>
                        <span className="font-medium text-gray-900">{plan.timeline}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">투자: </span>
                        <span className="font-medium text-blue-600">{plan.investment}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Investment Allocation */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">투자 배분 계획</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={investmentPlanData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="amount"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {investmentPlanData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '투자 비중']} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">핵심 성장 동력</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">바이오의약품 수요 급증</h4>
                    <p className="text-gray-600 text-sm">CDMO 시장 연 7%+ 성장, 아웃소싱 트렌드 가속화</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">신기술 모달리티</h4>
                    <p className="text-gray-600 text-sm">세포·유전자치료, ADC, mRNA 치료제 시장 급성장</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">지역 다변화</h4>
                    <p className="text-gray-600 text-sm">아시아, 신흥시장 진출로 글로벌 네트워크 확대</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">운영 효율화</h4>
                    <p className="text-gray-600 text-sm">디지털화, 자동화를 통한 생산성 혁신</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Factors */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">주요 리스크 요인</h3>
            
            {/* Risk Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {riskFactors.map((risk, index) => (
                <button
                  key={index}
                  onClick={() => setActiveRisk(index)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeRisk === index
                      ? 'bg-gray-900 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  {risk.category}
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    risk.level === 'High' ? 'bg-red-100 text-red-800' :
                    risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {risk.level}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Risk Content */}
            <motion.div
              key={activeRisk}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-br ${riskColors[riskFactors[activeRisk].color as keyof typeof riskColors].bg} p-8 rounded-2xl border ${riskColors[riskFactors[activeRisk].color as keyof typeof riskColors].border}`}
            >
              <div className="flex items-center mb-6">
                <AlertCircle className={`w-12 h-12 ${riskColors[riskFactors[activeRisk].color as keyof typeof riskColors].text} mr-4`} />
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">{riskFactors[activeRisk].category}</h4>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                    riskFactors[activeRisk].level === 'High' ? 'bg-red-200 text-red-800' :
                    riskFactors[activeRisk].level === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    리스크 수준: {riskFactors[activeRisk].level}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {riskFactors[activeRisk].factors.map((factor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 p-4 rounded-lg"
                  >
                    <p className="text-gray-800 text-sm leading-relaxed">{factor}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Risk Management */}
            <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-600" />
                리스크 관리 전략
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">경쟁력 강화</h5>
                  <p className="text-gray-600 text-sm">기술 혁신과 고부가가치 서비스로 차별화</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe2 className="w-8 h-8 text-purple-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">다변화</h5>
                  <p className="text-gray-600 text-sm">지역·고객·사업 포트폴리오 분산</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">안정성</h5>
                  <p className="text-gray-600 text-sm">재무 건전성 유지와 리스크 모니터링</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">파트너십</h5>
                  <p className="text-gray-600 text-sm">전략적 제휴로 리스크 분산과 기회 창출</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 