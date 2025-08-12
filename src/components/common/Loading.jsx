const Loading = ({ message = '読み込み中...', type = 'default' }) => {
  // ローディングタイプによって表示を変更
  const getLoadingContent = () => {
    switch (type) {
      case 'ai':
        return {
          icon: 'robot',
          title: 'AI が思考中...',
          subtitle: '最適な政策を検討しています',
        }
      case 'country':
        return {
          icon: 'government',
          title: '国家を建設中...',
          subtitle: '新しい国が誕生します',
        }
      case 'policy':
        return {
          icon: 'graph',
          title: '政策を分析中...',
          subtitle: '市民の反応を計算しています',
        }
      case 'citizen':
        return {
          icon: 'people',
          title: '市民の声を収集中...',
          subtitle: '様々な意見を集めています',
        }
      default:
        return {
          icon: 'hourglass',
          title: message,
          subtitle: '少々お待ちください',
        }
    }
  }

  const content = getLoadingContent()

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      {/* メインローディングアニメーション */}
      <div className="relative mb-6">
        {/* 回転する外側の円 */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

        {/* 中央のアイコン */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={`/assets/${content.icon}.png`} alt="icon" className="w-8" />
        </div>
      </div>

      {/* ローディングテキスト */}
      <div className="text-center max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {content.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{content.subtitle}</p>

        {/* プログレスバー風アニメーション */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* 装飾的な要素 */}
      <div className="flex space-x-2 mt-6">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        ></div>
      </div>
    </div>
  )
}

export default Loading
