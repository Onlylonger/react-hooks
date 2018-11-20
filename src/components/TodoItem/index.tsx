import className from 'classnames'
import * as React from 'react'
import CheckMarkSvg from '../../svgIcon/checkMark.svg'
import Style from './style.css'

export interface IProps {
  [key: string]: any
}

const TodoItem = (props: IProps) => {
  const { item } = props

  const handleChoose = () => {
    const { onChange } = props
    onChange && onChange()
  }

  return (
    <div className={Style.todoItem}>
      {item.isCheck ? (
        <div
          className={className(Style.circle, Style.circleCheck)}
          onClick={handleChoose}
        >
          <CheckMarkSvg className={Style.icon} />
        </div>
      ) : (
        <div onClick={handleChoose} className={Style.circle} />
      )}
      <div className={Style.label}>{item.label}</div>
    </div>
  )
}

export default TodoItem
