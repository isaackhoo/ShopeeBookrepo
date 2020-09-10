import React, { useState, useEffect } from 'react';
import './App.css';
import { Table } from 'antd';
import BooksInitialData from '../Assets/books.json';

export let App = () => {

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
        },
    ];

    // states
    const [BooksData, setBooksData] = useState([]);

    // effects
    useEffect(() => {
        // run once on page load
        let initData = [];
        initData = BooksInitialData.map((d, i) => {
            return {
                ...d,
                key: i
            };
        });

        setBooksData(initData);

        return () => { };
    }, []);

    return (
        <div className='App'>
            <Table
                columns={columns}
                dataSource={BooksData}
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: 2,
                    showQuickJumper: true,
                    hideOnSinglePage: true,
                    showSizeChanger: true,
                }}
                rowSelection={{
                    onSelect: () => { console.log(`selected`); }
                }}
                onRow={(record, idx) => {
                    return {
                        onClick: () => { console.log(`idx:${idx}: ${JSON.stringify(record, null, 4)}`); }
                    }
                }}
            />
        </div>
    )
}