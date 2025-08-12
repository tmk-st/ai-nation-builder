import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'

const Home: React.FC = () => {
  const navigate = useNavigate()

  // アプリの特徴
  const features = [
    {
      icon: 'government',
      title: '国家を設立',
      description: '国名、国旗、政治体制を決めてあなただけの国を作りましょう',
    },
    {
      icon: 'robot',
      title: 'AIと政治体験',
      description: 'AI官僚からの助言やAI市民の声を聞きながら政策を決定',
    },
    {
      icon: 'target',
      title: '様々な課題',
      description: '税制改革、環境対策、教育政策など現実的な政治課題に挑戦',
    },
    {
      icon: 'graph',
      title: 'リアルタイム評価',
      description: '政策の結果が国民の幸福度や経済指標にリアルタイムで反映',
    },
  ]

  /*
   * 基本情報設定画面に遷移
   */
  const handleStartGame = () => {
    navigate('/setup')
  }

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="w-full mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              AIとつくる
              <br />
              <span className="text-yellow-300">マイ国家シミュレーター</span>
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              仮想の国家を設立し、AI と対話しながら政治家として活動。
              <br />
              政策決定の難しさと面白さを体験しながら、理想の国作りに挑戦しよう！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleStartGame}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                国家を設立する
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="py-16 bg-white">
        <div className="w-full mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            アプリの特徴
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gray-50"
              >
                <div className="mb-4 flex justify-center">
                  <img
                    src={`/assets/${feature.icon}.png`}
                    alt="icon"
                    className="w-16"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ゲームフローセクション */}
      <div className="py-16 bg-gray-50">
        <div className="w-full mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            ゲームの流れ
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">国家設立</h3>
                <p className="text-gray-600">
                  国名、人口、政治体制、国旗をカスタマイズして理想の国を作成
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">政策決定</h3>
                <p className="text-gray-600">
                  AI
                  が提示する政治課題に対して、あなたの考えを入力して政策を決定
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">結果確認</h3>
                <p className="text-gray-600">
                  政策の結果を市民の反応と国家指標の変化で確認し、次の課題へ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA セクション */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="w-full mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            あなたの理想の国を作ってみませんか？
          </h2>
          <p className="text-xl mb-8 opacity-90">
            政治の複雑さと面白さを、AI との対話を通じて体験しよう
          </p>
          <Button
            onClick={handleStartGame}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            今すぐ始める →
          </Button>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="w-full mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 AI Nation Builder</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
