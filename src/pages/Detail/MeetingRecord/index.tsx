import { Flex, Cell } from 'react-vant'
import { IMeeting } from '@/models/types'

interface Props {
  total: number
  meetings: IMeeting[]
}

export default function MeetingRecord({
  total, meetings
}: Props) {
  return (
    <Flex direction='column'>
      <Cell.Group>
        <Cell title="单元格" value="内容" />
        <Cell title="单元格" value="内容" label="描述信息" />
      </Cell.Group>
    </Flex>
  )
}
