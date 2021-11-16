import { PropsWithChildren } from 'react'
import { PullToRefresh } from 'antd-mobile'

interface Props {
  onRefresh: () => Promise<any>
}

// 封装下拉刷新
export default function PullRefresh({
  children,
  onRefresh
}: PropsWithChildren<Props>) {
  return (
    <PullToRefresh
      onRefresh={onRefresh}
    >
      {children}
    </PullToRefresh>
  )
}
