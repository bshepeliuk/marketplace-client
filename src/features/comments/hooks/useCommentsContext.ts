import { useContext } from 'react';
import { CommentsContext } from '../context/CommentsContext';

const useCommentsContext = () => {
  const context = useContext(CommentsContext);

  if (context === undefined) {
    throw new Error(
      'useCommentsContext must be used within a CommentsProvider.',
    );
  }

  return context;
};

export default useCommentsContext;
