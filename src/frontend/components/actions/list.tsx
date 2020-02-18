import React, { useEffect } from 'react'

import { RouteComponentProps, useHistory, useLocation } from 'react-router'
import { AddNoticeProps } from '../../store/with-notice'

import RecordsTable from '../app/records-table/records-table'
import { ActionProps } from './action.props'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { Box, Pagination, Text } from '../design-system'
import useRecords from '../../hooks/use-records'
import useSelectedRecords from '../../hooks/use-selected-records'

// TODO: change after implementing per page dropdown
const PER_PAGE = 10

type State = {
  records: Array<RecordJSON>;
  page: number;
  perPage: number;
  total: number;
  loading: boolean;
  direction: 'asc' | 'desc';
  sortBy?: string;
  selectedRecords: Array<RecordJSON>;
}

type Props = ActionProps & RouteComponentProps & AddNoticeProps

// TODO: add direction enum

const List: React.FC<ActionProps> = ({ resource, setTag }) => {
  const {
    records,
    loading,
    direction,
    sortBy,
    page,
    total,
    fetchData,
  } = useRecords(resource.id)
  const {
    selectedRecords,
    handleSelect,
    handleSelectAll,
  } = useSelectedRecords(records)
  const location = useLocation()
  const history = useHistory()

  const handleActionPerformed = (): any => fetchData()

  const handlePaginationChange = (pageNumber: number): void => {
    const search = new URLSearchParams(location.search)
    search.set('page', pageNumber.toString())
    history.push({ search: search.toString() })
  }

  useEffect(() => {
    if (setTag) {
      setTag(total.toString())
    }
  }, [total])

  return (
    <Box variant="white">
      <RecordsTable
        resource={resource}
        records={records}
        actionPerformed={handleActionPerformed}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        selectedRecords={selectedRecords}
        direction={direction}
        sortBy={sortBy}
        isLoading={loading}
      />
      <Text mt="xl" textAlign="center">
        <Pagination
          page={page}
          perPage={PER_PAGE}
          total={total}
          onChange={handlePaginationChange}
        />
      </Text>
    </Box>
  )
}

export default List
