import React, { useEffect, useCallback } from 'react';
import './App.less';
import { Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header'
import { ControlButton } from '../Components/ControlButton';
import { DeleteButton } from '../Components/DeleteButton';
import { bookAdd } from '../Books/Redux/Action';
import { EditorView } from '../Pages/EditorView';
import { TableView } from '../Pages/TableView';
import { CustomModal } from '../Components/CustomModal';

import { appToggleEditingView } from './Redux/Actions';

import BooksInitialData from '../Assets/books.json';
import { clearSelectedRow } from '../Pages/TableView/Redux/Action';
import { setUpdatingRecordDetails } from '../Pages/EditorView/Redux/Action';

const { Title, Text } = Typography;

export let App = () => {

    const dispatch = useDispatch();

    const appReducer = useSelector(store => store.app);
    const tableReducer = useSelector(store => store.table);

    console.log(`Rendering App`);

    // effects
    useEffect(() => {
        // run once on page load :: [ComponentDidMount]
        BooksInitialData.forEach(d => dispatch(bookAdd(d)));
    }, [dispatch]);

    // methods
    const memoToggleEditingView = useCallback(
        () => {
            dispatch(appToggleEditingView());
        },
        [dispatch],
    );

    return (
        <div className='App'>
            <Header />
            <div className='PageView'>
                <div className='InnerPageView'>
                    <Space direction='vertical' size='middle'>
                        <div className='ControlButtons'>
                            <ControlButton
                                className="Control"
                                onClick={() => memoToggleEditingView()}
                            />
                            {!appReducer.isEditingView && <DeleteButton />}
                        </div>
                        {appReducer.isEditingView && <EditorView />}
                        {!appReducer.isEditingView
                            && <TableView
                                onEmpty={() => memoToggleEditingView()}
                                onEdit={(record) => {
                                    dispatch(setUpdatingRecordDetails(record));
                                    memoToggleEditingView();
                                }}
                            />
                        }
                    </Space>
                </div>
            </div>
            <CustomModal
                isVisible={tableReducer.selectedRow !== undefined}
                onClose={() => { dispatch(clearSelectedRow()); }}
                title={tableReducer.selectedRow?.title}
            >
                <div className='ModalBody'>
                    <Space
                        className='Space'
                        direction='vertical'
                        size='middle'
                    >
                        {/* Book information */}
                        <div>
                            <div className='ModalSubheader'>
                                <Text style={{ flex: 1 }}>{`ISBN:`}</Text>
                                <Text style={{ flex: 6 }}>{`${tableReducer.selectedRow?.isbn}`}</Text>
                            </div>
                            <div className='ModalSubheader'>
                                <Text style={{ flex: 1 }}>{`Genre:`}</Text>
                                <Text style={{ flex: 6 }}>{`${tableReducer.selectedRow?.genre}`}</Text>
                            </div>
                        </div>

                        {/* book summary */}
                        <div className='ModalSummaryContainer'>
                            <Title level={5}>{`Summary`}</Title>
                            <div className='ModalSummaryBody'>
                                <Text>
                                    {`${tableReducer.selectedRow?.summary}`}
                                </Text>
                            </div>
                        </div>
                    </Space>
                </div>
            </CustomModal>
        </div>
    )
}