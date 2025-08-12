// 政治体制の選択肢と解説
export const governmentTypes = [
  {
    value: 'democracy',
    label: '民主制',
    explanation:
      '国民が選挙で代表者を選び、その代表者が政治を行う制度です。多数決で物事を決めることが多く、国民の意見が政治に反映されやすいのが特徴です。日本やアメリカなどがこの制度を採用しています。',
  },
  {
    value: 'monarchy',
    label: '君主制',
    explanation:
      '王や皇帝などの君主が国を治める制度です。君主の権力の強さによって、絶対君主制（君主が全ての権力を持つ）と立憲君主制（君主の権力が憲法で制限される）に分けられます。イギリスやタイなどが立憲君主制です。',
  },
  {
    value: 'republic',
    label: '共和制',
    explanation:
      '君主がおらず、国民や国民の代表者が国を治める制度です。大統領が国家元首となることが多く、権力は複数の人や機関に分散されています。フランスや韓国などがこの制度を採用しています。',
  },
  {
    value: 'federation',
    label: '連邦制',
    explanation:
      '複数の州や地域が集まって一つの国を作る制度です。中央政府と地方政府がそれぞれ異なる権限を持ち、地域の特色を活かしながら国全体をまとめています。アメリカやドイツなどがこの制度です。',
  },
]

// 国旗の色の選択肢
export const flagColors = [
  { name: '赤', value: '#FF4757' },
  { name: '青', value: '#3742FA' },
  { name: '緑', value: '#2ED573' },
  { name: '黄色', value: '#FFA502' },
  { name: 'オレンジ', value: '#FF6348' },
  { name: '紫', value: '#A55EEA' },
  { name: 'ピンク', value: '#FF3838' },
  { name: '水色', value: '#7FDBFF' },
  { name: '茶色', value: '#D2691E' },
  { name: '黒', value: '#2F3542' },
  { name: '白', value: '#FFFFFF' },
  { name: 'グレー', value: '#A4B0BE' },
]

// 国旗のパターン（柄）の選択肢
export const flagPatterns = [
  { value: 'solid', label: '単色', preview: 'bg-current' },
  { value: 'horizontal', label: '水平線', preview: 'bg-gradient-to-r' },
  { value: 'vertical', label: '垂直線', preview: 'bg-gradient-to-b' },
  { value: 'diagonal', label: '斜線', preview: 'bg-gradient-to-br' },
  { value: 'cross', label: '十字', preview: 'bg-current' },
]
