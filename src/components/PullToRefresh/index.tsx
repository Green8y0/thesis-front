import { PropsWithChildren } from 'react'
import { PullRefresh } from 'react-vant'

interface Props {
  onRefresh: () => Promise<any>
}

// 封装下拉刷新
export default function PullToRefresh({
  children,
  onRefresh
}: PropsWithChildren<Props>) {
  return (
    <PullRefresh
      onRefresh={onRefresh}
    >
      {children}
    </PullRefresh>
  )
}
