'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Dna, FlaskConical, Pill, Package, TrendingUp, Users, Globe } from 'lucide-react'

const businessDivisions = [
  {
    id: 'biologics',
    title: '바이올로직스',
    subtitle: 'Biologics',
    icon: Dna,
    color: 'blue',
    description: '항체 의약품 등 대분자 바이오의약품의 개발 및 생산을 담당하는 풀서비스 CDMO 부문',
    features: [
      '세포주 개발부터 상업 생산까지 엔드투엔드 서비스',
      '단클론항체, ADC, mRNA 백신/치료제 생산',
      '세계 최대 규모의 바이오의약품 생산능력',
      '글로벌 주요 거점: 스위스 비스프, 미국 포츠머스, 싱가포르'
    ],
    marketShare: 35,
    growth: '+12%'
  },
  {
    id: 'smallmolecules',
    title: '스몰 몰레큘스',
    subtitle: 'Small Molecules',
    icon: FlaskConical,
    color: 'purple',
    description: '합성의약품 등 소분자 화합물 의약품의 활성물질(API) 생산과 경구제형 개발',
    features: [
      '고효능(API) 항암제 생산에 특화',
      '15,000리터 규모의 생산 능력',
      '미립화와 스프레이 건조 분산 기술',
      '150개+ 상업화 제품, 200개+ 임상 파이프라인'
    ],
    marketShare: 30,
    growth: '+6%'
  },
  {
    id: 'cellgene',
    title: '셀 앤 진',
    subtitle: 'Cell & Gene',
    icon: Pill,
    color: 'green',
    description: '세포·유전자 치료제 및 관련 연구도구 생산을 다루는 부문',
    features: [
      '글로벌 상업화 제품의 25% 이상 생산',
      'Cocoon® 자동화 셀처리 플랫폼',
      '세포배양배지, 엔도톡신 검사시약 공급',
      '바이러스 벡터 생산 전문화'
    ],
    marketShare: 20,
    growth: '+18%'
  },
  {
    id: 'capsules',
    title: '캡슐 및 건강제품',
    subtitle: 'Capsules & Health Ingredients',
    icon: Package,
    color: 'orange',
    description: '캡슐 제형과 건강기능성 원료 사업 (2024년 사업 철수 예정)',
    features: [
      '경질 캡슐 분야 세계 1위 공급업체',
      'Capsugel® 캡슐 연간 수십억 개 생산',
      '장용성 캡슐 기술 (DRcaps®)',
      '7,000여 고객사 대상 원스톱 솔루션'
    ],
    marketShare: 15,
    growth: '-2.4%'
  }
]

const marketGrowthData = [
  { sector: '바이오의약품 CDMO', growth: 11, size: 450 },
  { sector: '소분자 CDMO', growth: 5, size: 700 },
  { sector: '세포·유전자 치료', growth: 18, size: 120 },
  { sector: '캡슐/건강기능', growth: 3, size: 250 }
]

const competitorData = [
  { name: 'Lonza', market_share: 22, revenue: 6.7 },
  { name: 'Samsung Biologics', market_share: 18, revenue: 3.3 },
  { name: 'Catalent', market_share: 15, revenue: 4.5 },
  { name: 'Thermo Fisher', market_share: 12, revenue: 3.8 },
  { name: 'WuXi Biologics', market_share: 10, revenue: 2.8 }
]

export default function CoreProducts() {
  const [activeTab, setActiveTab] = useState('biologics')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const activeData = businessDivisions.find(div => div.id === activeTab) || businessDivisions[0]

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

  const COLORS = {
    blue: '#3B82F6',
    purple: '#8B5CF6',
    green: '#10B981',
    orange: '#F59E0B'
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
              핵심 제품 및 서비스
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              론자 그룹은 4개의 주요 사업부문을 통해 의약품 개발 전 주기에 걸친 종합 서비스를 제공합니다.
            </p>
          </motion.div>

          {/* Business Division Tabs */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {businessDivisions.map((division) => {
                const IconComponent = division.icon
                return (
                  <button
                    key={division.id}
                    onClick={() => setActiveTab(division.id)}
                    className={`flex items-center px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                      activeTab === division.id
                        ? `bg-${division.color}-600 text-white shadow-lg scale-105`
                        : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    {division.title}
                  </button>
                )
              })}
            </div>

            {/* Active Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center mb-6">
                    <activeData.icon className={`w-12 h-12 text-${activeData.color}-600 mr-4`} />
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{activeData.title}</h3>
                      <p className="text-lg text-gray-500">{activeData.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    {activeData.description}
                  </p>

                  <div className="space-y-4">
                    {activeData.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className={`w-2 h-2 bg-${activeData.color}-600 rounded-full mt-3 mr-4 flex-shrink-0`}></div>
                        <p className="text-gray-700">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className={`bg-gradient-to-br from-${activeData.color}-50 to-${activeData.color}-100 p-6 rounded-xl border border-${activeData.color}-200`}>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">시장 점유율</h4>
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <svg className="w-32 h-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#E5E7EB"
                            strokeWidth="8"
                            fill="none"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke={COLORS[activeData.color as keyof typeof COLORS]}
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${activeData.marketShare * 3.51} 351`}
                            strokeLinecap="round"
                            transform="rotate(-90 64 64)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-900">{activeData.marketShare}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200`}>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">성장률</h4>
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${
                        activeData.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {activeData.growth}
                      </div>
                      <p className="text-gray-600 mt-2">전년 대비</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Market Analysis Charts */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">시장 성장률 및 규모</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marketGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'growth' ? `${value}%` : `${value}억 달러`,
                      name === 'growth' ? '성장률' : '시장규모'
                    ]}
                  />
                  <Bar dataKey="growth" fill="#3B82F6" name="growth" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">주요 경쟁사 비교</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitorData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'market_share' ? `${value}%` : `${value}억 달러`,
                      name === 'market_share' ? '시장점유율' : '매출규모'
                    ]}
                  />
                  <Bar dataKey="market_share" fill="#8B5CF6" name="market_share" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Key Insights */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-4">시장 리더십</h4>
              <p className="text-gray-700">
                글로벌 CDMO 시장에서 매출 기준 1위를 유지하며, 
                특히 바이오의약품 분야에서 독보적인 생산능력을 보유
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-4">고객 다양성</h4>
              <p className="text-gray-700">
                작은 바이오벤처부터 대형 제약사까지 790여 고객사에 
                375개 신규 프로젝트 수주 (2022년 기준)
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
              <Globe className="w-12 h-12 text-green-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-4">통합 솔루션</h4>
              <p className="text-gray-700">
                초기 개발부터 상업화까지 원스톱 서비스 제공으로 
                고객의 개발 기간 단축과 공급망 리스크 최소화
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 