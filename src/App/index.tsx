import * as React from 'react'
import TodoItem from '../components/TodoItem/index'
import Style from './style.css'

const { useState, useEffect } = React

interface IDataIten {
  isCheck: boolean
  label: string
}

const defaultMockData = [
  {
    isCheck: false,
    label: 'nihao',
  },
  {
    isCheck: false,
    label: '买毛线',
  },
  {
    isCheck: false,
    label: '买腊肠',
  },
]

const App = () => {
  const [mockData, setMockData] = useState(
    (JSON.parse(sessionStorage.getItem('todoList')) as IDataIten[]) ||
      defaultMockData
  )
  const [label, setLabel] = useState('')

  useEffect(() => {
    return () => {
      sessionStorage.setItem('todoList', JSON.stringify(mockData))
    }
  })

  const handleChange = (index: number) => {
    mockData[index].isCheck = !mockData[index].isCheck
    setMockData(mockData)
  }

  const handleClose = (index: number) => {
    mockData.splice(index, 1)
    setMockData(mockData)
  }

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      mockData.push({
        isCheck: false,
        label,
      })
      setMockData(mockData)
      setLabel('')
    }
  }

  const handleInput: React.FormEventHandler<HTMLInputElement> = e => {
    setLabel((e.target as HTMLInputElement).value)
  }

  return (
    <div className={Style.app}>
      <div className={Style.title}>TODOS</div>
      <div className={Style.box}>
        <div className={Style.searchWrap}>
          <input
            className={Style.searchInput}
            placeholder="What needs to be done"
            onKeyUp={handleKeyUp}
            value={label}
            onChange={handleInput}
          />
          <div className={Style.icon}>▼</div>
        </div>
        {mockData.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            onChange={handleChange.bind(this, index)}
            onClose={handleClose.bind(this, index)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
