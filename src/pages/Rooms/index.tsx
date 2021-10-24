import { useRequest, useMount } from 'ahooks'

import { roomsService } from '@/services'

export default function Rooms() {
  const { data, run } = useRequest(roomsService.search, {
    manual: true
  })

  useMount(() => {
    run({})
  })
  return (
    <>
      <h2>Rooms</h2>
      {data?.data.rows.map(item => (
        <div key={item.id}>{item.id} {item.title}</div>
      ))}
    </>
  )
}
