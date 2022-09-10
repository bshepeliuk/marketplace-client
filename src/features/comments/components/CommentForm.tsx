import React from 'react';
import { useFormik } from 'formik';
import { CommentSchema } from '@src/features/auth/validation/commentSchema';
import { CancelButton, Form, InnerWrap, SendButton, TextArea } from '../styles/commentForm.styled';

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
  const { handleSubmit, hasCancel = false, defaultValue = '', handleCancel = () => {} } = props;

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

  const isDisabled = !(formik.isValid && formik.dirty);

  const onCancel = () => {
    formik.resetForm();
    handleCancel();
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextArea
        className="custom-scrollbar"
        placeholder="Please enter your message here..."
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

export default CommentFormView;
