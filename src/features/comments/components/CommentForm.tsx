import React from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { CommentSchema } from '@src/features/auth/validation/commentSchema';

interface IComment {
  body: string;
}

interface IProps {
  defaultValue?: string;
  handleSubmit: (text: string) => void;
  handleCancel?: () => void;
  hasCancel?: boolean;
}

function CommentFormView(props: IProps) {
  const {
    handleSubmit,
    hasCancel = false,
    defaultValue = '',
    handleCancel = () => {},
  } = props;

  const formik = useFormik<IComment>({
    initialValues: {
      body: defaultValue,
    },
    validationSchema: CommentSchema,
    onSubmit: ({ body }, { resetForm }) => {
      handleSubmit(body);
      resetForm();
    },
  });
  // prettier-ignore
  const isDisabled = !(formik.isValid && formik.dirty)

  const onCancel = () => {
    formik.resetForm();
    handleCancel();
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextArea
        className="custom-scrollbar"
        name="body"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.body}
      />

      <InnerWrap>
        {hasCancel && (
          <CancelButton type="button" onClick={onCancel}>
            cancel
          </CancelButton>
        )}

        <SendButton type="submit" disabled={isDisabled}>
          send
        </SendButton>
      </InnerWrap>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
`;

const TextArea = styled.textarea`
  height: 90px;
  resize: none;
  padding-bottom: 0;
  padding: 10px;
  border-radius: 4px;

  &:focus {
    outline: 1px solid #1abc9c;
    border: 1px solid #1abc9c;
  }
`;

const InnerWrap = styled.div`
  display: flex;
  justify-content: end;
`;

const SendButton = styled.button`
  width: 150px;
  height: 40px;
`;

const CancelButton = styled.button``;

export default CommentFormView;
