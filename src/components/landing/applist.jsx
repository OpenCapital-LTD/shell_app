import React from 'react'
import { HomeOutlined, PendingOutlined } from "@mui/icons-material"
import { FileProtectOutlined, SignatureOutlined, SlidersOutlined } from '@ant-design/icons'

const appList = {
    pj_service:{
        app_id:'pj_service',
        title:'Project Code Survey',
        icon: <FileProtectOutlined className='icon'/>,
        url:'project_service'
    },
    el_service:{
        app_id:'pj_service',
        title:'Expense Logging',
        icon: <SignatureOutlined className='icon'/>,
        url:'project_service'
    },
    cn_service:{
        app_id:'pj_service',
        title:'Admin Setup',
        icon: <SlidersOutlined className='icon'/>,
        url:'config'
    },
    cs_service:{
        app_id:'pj_service',
        title:'comming soon...',
        icon: <PendingOutlined className='icon'/>,
        url:'/'
    }

}

export default appList