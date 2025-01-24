'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider, theme } from 'antd'
import React from 'react'

const Providers = ({children}: React.PropsWithChildren) => {
  return (
    <AntdRegistry>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            {children}
        </ConfigProvider>
    </AntdRegistry>
    
  )
}

export default Providers