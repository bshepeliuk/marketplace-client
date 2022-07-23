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
}

function CommentFormView(props: IProps) {
  const { defaultValue = '', handleSubmit } = props;

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

  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextArea
        className="custom-scrollbar"
        name="body"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.body}
      />

      <SendButton type="submit" disabled={isDisabled}>
        send
      </SendButton>
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

const SendButton = styled.button`
  width: 150px;
  height: 40px;
  align-self: end;
`;

export default CommentFormView;
