'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { Shield, Zap, Target, AlertTriangle, TrendingUp, Users, Globe, Award, Search, Lightbulb } from 'lucide-react'

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

export default function MarketPosition() {
  const [activeSwot, setActiveSwot] = useState<keyof typeof swotData>('strengths')
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

  const swotColors = {
    green: { bg: 'from-green-50 to-emerald-100', border: 'border-green-200', text: 'text-green-600', button: 'bg-green-600' },
    orange: { bg: 'from-orange-50 to-yellow-100', border: 'border-orange-200', text: 'text-orange-600', button: 'bg-orange-600' },
    blue: { bg: 'from-blue-50 to-indigo-100', border: 'border-blue-200', text: 'text-blue-600', button: 'bg-blue-600' },
    red: { bg: 'from-red-50 to-pink-100', border: 'border-red-200', text: 'text-red-600', button: 'bg-red-600' }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              시장 내 포지션 및 전략
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              론자 그룹의 시장 지위와 경쟁 우위를 SWOT 분석과 R&D 전략을 통해 살펴봅니다.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-blue-900 mb-2">#1</h3>
              <p className="text-blue-700">글로벌 CDMO 매출 순위</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-purple-900 mb-2">22%</h3>
              <p className="text-purple-700">시장 점유율</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-900 mb-2">790+</h3>
              <p className="text-green-700">고객사 (2022)</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-orange-900 mb-2">375</h3>
              <p className="text-orange-700">신규 프로젝트 (2022)</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">SWOT 분석</h3>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {Object.entries(swotData).map(([key, data]) => {
                const IconComponent = data.icon
                const isActive = activeSwot === key
                return (
                  <button
                    key={key}
                    onClick={() => setActiveSwot(key as keyof typeof swotData)}
                    className={`flex items-center px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                      isActive
                        ? `${swotColors[data.color as keyof typeof swotColors].button} text-white shadow-lg scale-105`
                        : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    {data.title}
                  </button>
                )
              })}
            </div>

            <motion.div
              key={activeSwot}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-br ${swotColors[swotData[activeSwot].color as keyof typeof swotColors].bg} p-8 rounded-2xl border ${swotColors[swotData[activeSwot].color as keyof typeof swotColors].border}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="flex items-center mb-6">
                    {React.createElement(swotData[activeSwot].icon, { 
                      className: `w-12 h-12 ${swotColors[swotData[activeSwot].color as keyof typeof swotColors].text} mr-4` 
                    })}
                    <h4 className="text-3xl font-bold text-gray-900">{swotData[activeSwot].title}</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {swotData[activeSwot].items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className={`w-2 h-2 ${swotColors[swotData[activeSwot].color as keyof typeof swotColors].button} rounded-full mt-3 mr-4 flex-shrink-0`}></div>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(swotData).map(([key, data]) => {
                    const IconComponent = data.icon
                    const isCurrentActive = key === activeSwot
                    return (
                      <div
                        key={key}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                          isCurrentActive
                            ? `${swotColors[data.color as keyof typeof swotColors].border} bg-white/80 scale-105`
                            : 'border-gray-200 bg-white/50'
                        }`}
                      >
                        <IconComponent className={`w-8 h-8 ${swotColors[data.color as keyof typeof swotColors].text} mb-3`} />
                        <h5 className="font-semibold text-gray-900 text-sm">{data.title}</h5>
                        <p className="text-xs text-gray-600 mt-1">{data.items.length}개 요소</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Search className="w-6 h-6 mr-2 text-blue-600" />
                R&D 투자 현황
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={rdInvestmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}%`,
                      name === 'rd' ? 'R&D 투자율' : 'CAPEX 투자율'
                    ]}
                  />
                  <Area type="monotone" dataKey="rd" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="capex" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 text-sm text-gray-600">
                <p>• R&D: 매출 대비 5-7% 지속 투자</p>
                <p>• CAPEX: 매출 대비 25-30% 공격적 투자</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-purple-600" />
                경쟁력 비교 분석
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={competitiveRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Lonza" dataKey="lonza" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Radar name="Samsung" dataKey="samsung" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                  <Radar name="Catalent" dataKey="catalent" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
              <Lightbulb className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-4">R&D 전략</h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• 공정혁신과 플랫폼 기술 확보에 집중</li>
                <li>• Cocoon® 자동화 플랫폼 개발</li>
                <li>• AI 기반 공정최적화 도입</li>
                <li>• 차세대 세포주 개발 기술</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-4">기술 제휴</h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• Vertex와 세포치료제 전용시설 공동투자</li>
                <li>• Synaffix 인수로 ADC 기술 강화</li>
                <li>• ABL Bio와 이중항체 개발 협력</li>
                <li>• 개방형 혁신(Open Innovation) 추진</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
              <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-4">성장 전망</h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>• 2024-2028 매출 CAGR 11-13% 목표</li>
                <li>• CORE EBITDA 마진 32-34% 유지</li>
                <li>• 핵심사업 집중으로 효율성 제고</li>
                <li>• 선제적 생산능력 확장 지속</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 