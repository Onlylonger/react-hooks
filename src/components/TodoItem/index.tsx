import className from 'classnames'
import * as React from 'react'
import CancelSvg from '../../svgIcon/cancel.svg'
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

  const handleClose = () => {
    const { onClose } = props
    onClose && onClose()
  }

  return (
    <div className={Style.todoItem}>
      {item.isCheck ? (
        <>
          <div
            className={className(Style.circle, Style.circleCheck)}
            onClick={handleChoose}
          >
            <CheckMarkSvg className={Style.icon} />
          </div>
          <div className={className(Style.label, Style.labelComplete)}>
            {item.label}
          </div>
        </>
      ) : (
        <>
          <div onClick={handleChoose} className={Style.circle} />
          <div className={Style.label}>{item.label}</div>
        </>
      )}
      <CancelSvg className={Style.cancel} onClick={handleClose} />
    </div>
  )
}

export default TodoItem
