import React from 'react';
import './Header.less';
import { PageHeader } from 'antd';

export let Header = (props) => {
    return (
        <div {...props}>
            <PageHeader
                title={
                    <div className='HeaderTitle'>
                        <div className='HeaderTitleLeft paddingHorizontal'>
                            IsaacKhoo
                    </div>
                        <div className='HeaderTitleRight paddingHorizontal'>
                            BookRepo
                    </div>
                    </div>
                }
            />
        </div>
    )
};