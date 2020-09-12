import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { bookDelete } from '../../Books/Redux/Action';
import { updateSelectedTableKeys } from '../../Pages/TableView/Redux/Action';


export let DeleteButton = (props) => {

    console.log(`Rendering DeleteButton`);

    const { className, style, ...rest } = props;

    const dispatch = useDispatch();
    const tableReducer = useSelector(store => store.table);

    const onDeleteSelected = () => {
        for (let key of tableReducer.selectedKeys) {
            dispatch(bookDelete(key));
        };
        dispatch(updateSelectedTableKeys([]));
    };

    return (
        <Button
            type="primary"
            // changing array lengths will cause button to keep re-rendering. its fine anyway, just a small button
            disabled={tableReducer.selectedKeys.length === 0}
            icon={<DeleteOutlined />}
            onClick={() => onDeleteSelected()}
            {...rest}
        >
            {`Delete`}
        </Button>
    );
};