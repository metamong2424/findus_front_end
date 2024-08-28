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

const ListCard: FC<UserCardProps> = () => {
  // const {image, writer} = card
  // const {avatar, name, jobTitle} = writer
  // 메인화면(인기 게시글, 인기 사용자, today 방문, total 방문, 놀이 게시판, 교육 게시판, 취업 게시판)
  return (
    <div>
      <p>인기 게시글</p>
      <p>인기 사용자</p>
      <p>today 방문</p>
      <p>total 방문</p>
      <p>놀이 게시판</p>
      <p>교육 게시판</p>
      <p>취업 게시판</p>
    </div>
  )
}
export default ListCard
