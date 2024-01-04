import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getApplyLeaveDetails } from 'src/store/actions/employeeLeaveAction'
import DataTable from 'react-data-table-component'

const EmployeeLeaveDetails = () => {
  const dispatch = useDispatch()

  // Fetching data from the Redux store
  const { allEmployeeLeaveData, isLoading } = useSelector((state) => state.employee)
  console.log('allEmployeeLeaveData', allEmployeeLeaveData)

  useEffect(() => {
    // Dispatch the action to get leave details
    dispatch(getApplyLeaveDetails())
  }, [])

  const [filteredData, setFilteredData] = useState([])
  const [searchText, setSearchText] = useState('')

  const columns = [
    {
      name: 'Leave ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: 'start_date',
      sortable: true,
    },
    {
      name: 'End Date',
      selector: 'end_date',
      sortable: true,
    },
    {
      name: 'Manager Name',
      selector: 'display_name',
      sortable: true,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
    },
    // Add more columns as needed
  ]

  useEffect(() => {
    if (allEmployeeLeaveData.data) {
      setFilteredData(allEmployeeLeaveData.data)
    }
  }, [allEmployeeLeaveData])

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase()
    setSearchText(keyword)
    const filtered = allEmployeeLeaveData.data.filter((item) =>
      item.display_name.toLowerCase().includes(keyword),
    )
    setFilteredData(filtered)
  }

  return (
    <div>
      <h1>Employee Leave Details</h1>
      <input
        type="text"
        placeholder="Search by Manager Name"
        value={searchText}
        onChange={handleSearch}
      />
      {/* Check isLoading to show loading indicator */}
      {isLoading ? (
        <div>Loading...</div>
      ) : Array.isArray(allEmployeeLeaveData.data) ? (
        <DataTable title="Leave Details" columns={columns} data={filteredData} pagination />
      ) : (
        <div>No leave data available</div>
      )}
    </div>
  )
}

export default EmployeeLeaveDetails
