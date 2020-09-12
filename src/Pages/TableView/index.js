import React from 'react';
import { Table, Empty, ConfigProvider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ControlButton } from '../../Components/ControlButton';
import EmptySVG from '../../Assets/Images/empty.svg';
import { updateSelectedTableKeys } from './Redux/Action';

export let TableView = (props) => {

    console.log(`Rendering TableView`);

    const dispatch = useDispatch();
    const bookReducer = useSelector(store => store.books);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: '70%'
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            width: '15%'
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
        },
    ];

    const onSelectedRowsChange = (selectedRows) => {
        // filter first, because after deleting keys, 
        // table component doesnt update its selected array, resulting in an undefined key
        const keys = selectedRows.filter(r => r && r).map(r => r && r.key);
        dispatch(updateSelectedTableKeys(keys));
    };

    return (
        <ConfigProvider
            renderEmpty={() =>
                <Empty
                    image={EmptySVG}
                    imageStyle={{
                        height: '10em',
                    }}
                    description={
                        <span>
                            No books to display
                        </span>
                    }
                >
                    <ControlButton
                        type="primary"
                        onClick={() => props.onEmpty()}
                    />
                </Empty>}
        >
            <Table
                columns={columns}
                dataSource={bookReducer.books}
                pagination={{
                    position: ['bottomRight'],
                    pageSize: 5,
                    showQuickJumper: true,
                    hideOnSinglePage: true,
                }}
                rowSelection={{
                    onSelect: (record, selected, selectedRows) => {
                        onSelectedRowsChange(selectedRows);
                    },
                    onSelectMultiple: (selected, selectedRows) => {
                        onSelectedRowsChange(selectedRows);
                    },
                    onSelectAll: (selected, selectedRows) => {
                        onSelectedRowsChange(selectedRows);
                    }
                }}
                onRow={(record, idx) => {
                    return {
                        onClick: () => { console.log(`idx:${idx}: ${JSON.stringify(record, null, 4)}`); }
                    }
                }}
            />
        </ConfigProvider>
    )
};