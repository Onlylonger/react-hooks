import * as React from 'react'
import TodoItem from '../components/TodoItem/index'
import Style from './style.css'

const { useState } = React

const defaultMockData = [
  {
    isCheck: false,
    label: 'nihao',
  },
  {
    isCheck: false,
    label: '什么哦',
  },
  {
    isCheck: false,
    label: '买腊肠',
  },
]

const App = () => {
  const [mockData, setMockData] = useState(defaultMockData)

  const handleChange = (index: number) => {
    mockData[index].isCheck = !mockData[index].isCheck
    setMockData(mockData)
  }

  return (
    <div className={Style.app}>
      <div className={Style.title}>TODOS</div>
      <div className={Style.box}>
        <div className={Style.searchWrap}>
          <input
            className={Style.searchInput}
            placeholder="What needs to be done"
          />
          <div className={Style.icon}>▼</div>
        </div>
        {mockData.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            onChange={handleChange.bind(this, index)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
