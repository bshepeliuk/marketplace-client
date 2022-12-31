import { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { CommentSchema } from '@src/features/auth/validation/commentSchema';
import LoaderView from '@common/components/Loader/Loader';
import { CancelButton, Form, InnerWrap, SendButton, TextArea } from '../styles/commentForm.styled';

interface IComment {
  body: string;
}

interface IProps {
  defaultValue?: string;
  handleSubmit: (_: string) => void;
  handleCancel?: () => void;
  hasCancel?: boolean;
  isLoading?: boolean;
}

function CommentFormView(props: IProps) {
  const isMounted = useRef(false);

  const { handleSubmit, hasCancel = false, defaultValue = '', isLoading = false, handleCancel = () => {} } = props;

  const formik = useFormik<IComment>({
    initialValues: {
      body: defaultValue,
    },
    validationSchema: CommentSchema,
    onSubmit: async ({ body }, { resetForm }) => {
      await handleSubmit(body);

      if (isMounted.current) {
        resetForm();
      }
    },
  });

  const isDisabled = !(formik.isValid && formik.dirty && !isLoading);

  const onCancel = () => {
    formik.resetForm();
    handleCancel();
  };

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

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
          <CancelButton type="button" onClick={onCancel} disabled={isLoading}>
            cancel
          </CancelButton>
        )}

        <SendButton type="submit" disabled={isDisabled}>
          {isLoading ? <LoaderView size={20} color="#3498db" strokeWidth={2} /> : 'send'}
        </SendButton>
      </InnerWrap>
    </Form>
  );
}

export default CommentFormView;
