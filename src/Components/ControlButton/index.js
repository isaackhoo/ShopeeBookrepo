import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

export let ControlButton = (props) => {

    console.log(`Rendering Control Button`);

    const { className, style, ...rest } = props;

    const appReducer = useSelector(store => store.app);
    const { isEditingView } = appReducer;

    return (
        <Button
            icon={isEditingView ? <RollbackOutlined /> : <PlusOutlined />}
            onClick={() => { console.log(`No onClick callback provided`); }}
            {...rest}
        >
            {appReducer.isEditingView ? `Return` : `Add Book`}
        </Button>
    );
};