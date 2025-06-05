'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, Globe, MapPin, Phone, Calendar } from 'lucide-react'

export default function Footer() {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Building2 className="w-10 h-10 text-blue-400 mr-3" />
                <h3 className="text-3xl font-bold">Lonza Group</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                스위스 바젤에 본사를 둔 125년 역사의 글로벌 바이오의약품 위탁개발·생산(CDMO) 선도기업으로, 
                제약·바이오 산업의 핵심 파트너로서 혁신적인 솔루션을 제공하고 있습니다.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-blue-300 font-semibold">글로벌 CDMO 1위</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-purple-300 font-semibold">18,000명 임직원</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="text-green-300 font-semibold">30여 생산거점</span>
                </div>
              </div>
            </motion.div>

            {/* Key Statistics */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold mb-6 text-blue-300">핵심 지표</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <div>
                    <p className="text-gray-300 text-sm">2023년 매출</p>
                    <p className="font-semibold">67.17억 CHF</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <div>
                    <p className="text-gray-300 text-sm">영업이익률</p>
                    <p className="font-semibold">13.1%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <div>
                    <p className="text-gray-300 text-sm">R&D 투자</p>
                    <p className="font-semibold">매출의 5-7%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  <div>
                    <p className="text-gray-300 text-sm">시장 점유율</p>
                    <p className="font-semibold">22%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business Divisions */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold mb-6 text-purple-300">주요 사업부문</h4>
              <div className="space-y-3">
                <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <span className="text-blue-400">•</span> 바이올로직스 (Biologics)
                </div>
                <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <span className="text-purple-400">•</span> 스몰 몰레큘스 (Small Molecules)
                </div>
                <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <span className="text-green-400">•</span> 셀 앤 진 (Cell & Gene)
                </div>
                <div className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <span className="text-orange-400">•</span> 캡슐 및 건강제품 (CHI)
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="border-t border-gray-700 pt-12 mb-12">
            <h4 className="text-2xl font-bold mb-8 text-center">본사 및 연락처 정보</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-400" />
                </div>
                <h5 className="font-semibold mb-2">본사 위치</h5>
                <p className="text-gray-300 text-sm">스위스 바젤 (Basel)</p>
                <p className="text-gray-400 text-xs">Muenchensteinerstrasse 38</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-400" />
                </div>
                <h5 className="font-semibold mb-2">웹사이트</h5>
                <p className="text-gray-300 text-sm">lonza.com</p>
                <p className="text-gray-400 text-xs">공식 기업 사이트</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-400" />
                </div>
                <h5 className="font-semibold mb-2">설립년도</h5>
                <p className="text-gray-300 text-sm">1897년</p>
                <p className="text-gray-400 text-xs">125년+ 역사</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-orange-400" />
                </div>
                <h5 className="font-semibold mb-2">상장</h5>
                <p className="text-gray-300 text-sm">SIX Swiss Exchange</p>
                <p className="text-gray-400 text-xs">티커: LONN</p>
              </div>
            </div>
          </motion.div>

          {/* Growth Outlook */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 mb-12">
            <h4 className="text-2xl font-bold mb-6 text-center">중장기 성장 전망</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">11-13%</div>
                <p className="text-gray-300">연평균 매출 성장률</p>
                <p className="text-xs text-gray-400">(2024-2028 목표)</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">32-34%</div>
                <p className="text-gray-300">CORE EBITDA 마진</p>
                <p className="text-xs text-gray-400">목표 수준 유지</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">50억+</div>
                <p className="text-gray-300">CHF 총 투자 규모</p>
                <p className="text-xs text-gray-400">(2024-2026)</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div variants={itemVariants} className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Building2 className="w-6 h-6 text-blue-400 mr-2" />
                <p className="text-gray-400 text-sm">
                  © 2024 Lonza Group 사례 분석 보고서. 교육 목적으로 제작됨.
                </p>
              </div>
              <div className="flex space-x-6">
                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                  분석 방법론
                </button>
                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                  데이터 출처
                </button>
                <button className="text-gray-400 hover:text-white transition-colors text-sm">
                  면책 조항
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </footer>
  )
} 