import React, { useEffect, useCallback } from 'react';
import './App.less';
import { Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header'
import { ControlButton } from '../Components/ControlButton';
import { DeleteButton } from '../Components/DeleteButton';
import { bookAdd } from '../Books/Redux/Action';
import { EditorView } from '../Pages/EditorView';
import { TableView } from '../Pages/TableView';

import { appToggleEditingView } from './Redux/Actions';

import BooksInitialData from '../Assets/books.json';

export let App = () => {

    const dispatch = useDispatch();

    const appReducer = useSelector(store => store.app);

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
            <Space direction='vertical' size='middle'>
                <Header />
            </Space>
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
                        {!appReducer.isEditingView && <TableView onEmpty={() => memoToggleEditingView()} />}
                    </Space>
                </div>
            </div>
        </div>
    )
}