import '../styles/draggable.css';
import useGetComparisonTable from '../hooks/useGetComparisonTable';
import ComparisonHeaderView from '../components/Header/ComparisonHeaderView';
import ComparisonBodyView from '../components/Body/ComparisonBodyView';
import { ComparisonTable, InfoContainer } from '../styles/comparisonTable.styled';

function ComparisonView() {
  const { hasNoItemsForComparison } = useGetComparisonTable();

  if (hasNoItemsForComparison) {
    return <InfoContainer>You have not added devices for comparison yet.</InfoContainer>;
  }

  return (
    <ComparisonTable>
      <ComparisonHeaderView />
      <ComparisonBodyView />
    </ComparisonTable>
  );
}

export default ComparisonView;
