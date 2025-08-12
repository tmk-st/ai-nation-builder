import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  /*
   * ホームへ戻る
   */
  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="w-full mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* アプリタイトル */}
          <div className="flex items-center space-x-3">
            <div>
              <h1
                onClick={handleGoHome}
                className="text-xl font-bold cursor-pointer"
              >
                マイ国家シミュレーター
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
