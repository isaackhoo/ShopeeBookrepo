import React, { useEffect, useState } from 'react';
import './CustomModal.less';
import { Button, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

export let CustomModal = (props) => {

    console.log(`Rendering Custom Modal`);

    const {
        isVisible,
        onClose,
        paperClassName,
        paperStyle,
        title,
        children,
        ...rest
    } = props;
    const [IsVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // updates modal visibility
        setIsVisible(isVisible);
    }, [isVisible]);

    // methods
    const defaultOnClose = () => {
        console.log(`No onClose Provided`);
        setIsVisible(!IsVisible);
    };

    return IsVisible
        ?
        (
            <div
                className='CustomModal'
                onClick={
                    onClose
                        ? onClose
                        : defaultOnClose
                }
                {...rest}
            >
                <div
                    id='paper'
                    className={`ModalPaper ${paperClassName}`}
                    style={{ ...paperStyle }}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Space direction='vertical' size='small'>
                        <div className='ModalPaperHeaderDiv'>
                            <div className='ModalPaperHeaderTitleDiv'>
                                <Title level={4}>
                                    {title || 'No title'}
                                </Title>
                            </div>
                            <Button
                                type='text'
                                icon={<CloseOutlined />}
                                onClick={
                                    onClose
                                        ? onClose
                                        : defaultOnClose
                                }
                            />
                        </div>
                        <div className='childrenDiv'>
                            {children}
                        </div>
                    </Space>
                </div>
            </div>
        )
        : null;
};