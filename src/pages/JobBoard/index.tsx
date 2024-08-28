import type {FC} from 'react'
import type {ICard} from '../../data'
import {CardDraggable} from '../../components'
import {Div, Avatar} from '../../components'
import {Icon} from '../../theme/daisyui'

export type UserCardProps = {
  // card: ICard
  // onRemove?: () => void
  // onClick?: () => void
  // draggableId: string
  // index: number
}

const JobBoard: FC<UserCardProps> = () => {
  // const {image, writer} = card
  // const {avatar, name, jobTitle} = writer

  return <span>JobBoard</span>
}
export default JobBoard
