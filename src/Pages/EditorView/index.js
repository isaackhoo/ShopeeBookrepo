import React from 'react';
import './EditorView.less';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Book } from '../../Books/Book';
import { useDispatch, useSelector } from 'react-redux';
import { bookAdd } from '../../Books/Redux/Action';
import { appToggleEditingView } from '../../App/Redux/Actions';
import { LoremIpsum } from 'lorem-ipsum';

const { TextArea } = Input;

// prepare lorem
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

export let EditorView = (props) => {

    console.log(`Rendering EditorView`);

    const { ...rest } = props;

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const booksReducer = useSelector(store => store.books);

    const layout = 'vertical';

    const layoutWithoutLabel = {
        wrapperCol: {
            span: 24,
        }
    }

    const layoutButtons = {
        wrapperCol: {
            span: 24,
        }
    }

    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: '${label} is required!',
    };

    const onQuickFill = () => {
        form.setFieldsValue({
            Title: lorem.generateSentences(1),
            ISBN: Book.generateRandomIsbn(),
            GenreList: [lorem.generateWords(1)],
            Summary: lorem.generateParagraphs(5)
        });
    }

    const onFinish = (values) => {
        dispatch(bookAdd({
            title: values.Title,
            isbn: values.ISBN,
            genre: values.GenreList,
            summary: values.Summary
        }));
        dispatch(appToggleEditingView());
    }

    return (
        <div className='EditorView'>
            <Form
                form={form}
                className='FormContainer'
                layout='vertical'
                name="book-editor"
                validateMessages={validateMessages}
                initialValues={{
                    GenreList: [""]
                }}
                onFinish={onFinish}
                {...rest}
            >

                <Form.Item
                    name={'Title'}
                    label="Title"
                    hasFeedback
                    validateTrigger={'onBlur'}
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Input
                        placeholder={`Book title`}
                    />
                </Form.Item>
                <Form.Item
                    name={'ISBN'}
                    label='ISBN'
                    hasFeedback
                    validateTrigger={'onBlur'}
                    rules={[
                        {
                            required: true
                        },
                        () => ({
                            validator(_, value) {
                                // check if input is a valid isbn
                                if (Book.isValidIsbn(value)) {
                                    // check that isbn doesnt already exist in list
                                    if (Array.isArray(booksReducer.books)
                                        && booksReducer.books.some(b => b.isbn === value))
                                        return Promise.reject(`ISBN already exists in repository`);

                                    return Promise.resolve();
                                }
                                return Promise.reject(`ISBN is invalid`);
                            }
                        })
                    ]}
                >
                    <Input
                        className='NumberInput'
                        placeholder={`[978|979]-[Group]-[Reg]-[Pub]-[CheckDigit]`}
                    />
                </Form.Item>
                <Form.List
                    name={'GenreList'}
                >
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        className='formListItem'
                                        {...(index === 0 ? layout : layoutWithoutLabel)}
                                        label={index === 0 ? 'Genre' : ''}
                                        required={true}
                                        hasFeedback
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={'onBlur'}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: index === 0
                                                        ? "Genre is required"
                                                        : "Please input genre or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder={`Genre type`}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className='dynamic-delete-button'
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item
                                    {...layoutWithoutLabel}
                                >
                                    <Button
                                        style={{ width: '100%' }}
                                        type='dashed'
                                        onClick={() => add()}
                                    >
                                        <PlusOutlined /> Add Genre
                                    </Button>
                                </Form.Item>
                            </div>
                        )
                    }}
                </Form.List>
                <Form.Item
                    name={'Summary'}
                    label="Summary"
                >
                    <TextArea
                        className='TextArea'
                    />
                </Form.Item>
                <Form.Item
                    {...layoutButtons}
                >
                    <div className='ButtonGroup'>
                        <Button
                            type='link'
                            htmlType="button"
                            onClick={() => { onQuickFill() }}
                        >
                            Quick Fill
                        </Button>
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            Add Book
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div >
    );
};