import { IconFont } from '../IconFont'
import classNames from '@/libs/classNames'

interface Props {
  className?: string
}

export default function customIcon ({ className }: Props) {
  return (
    <div className={classNames('icons-list', className)}>
      <IconFont name="icon-xinjian" />
    </div>
  )
}
