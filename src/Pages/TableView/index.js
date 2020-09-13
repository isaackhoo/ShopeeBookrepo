import React from 'react';
import './TableView.less';
import { Table, Empty, ConfigProvider, Button, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ControlButton } from '../../Components/ControlButton';
import EmptySVG from '../../Assets/Images/empty.svg';
import { setSelectedRow, updateSelectedTableKeys } from './Redux/Action';
import { EditOutlined } from '@ant-design/icons';

export let TableView = (props) => {

    console.log(`Rendering TableView`);

    const dispatch = useDispatch();
    const bookReducer = useSelector(store => store.books);
    const tableReducer = useSelector(store => store.table);

    const columns = [
        {
            title: tableReducer.selectedKeys.length > 0
                ? `Title (${tableReducer.selectedKeys.length} books selected)`
                : 'Title',
            dataIndex: 'title',
            width: '60%',
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            width: '20%'
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            width: '10%',
            responsive: ['lg']
        },
        {
            render: (text) => (
                <Tooltip
                    arrowPointAtCenter
                    title={`Edit Record ${text.isbn}`}
                >
                    <Button
                        type='text'
                        icon={<EditOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onEdit && props.onEdit(text);
                        }}
                    />
                </Tooltip>

            )
        }
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
                        onClick: () => {
                            dispatch(setSelectedRow(record));
                        }
                    }
                }}
            />
        </ConfigProvider>
    )
};