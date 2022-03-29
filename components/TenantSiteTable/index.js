import { useState } from 'react'
import Button from '../UI/Button'
import ReactPaginate from 'react-paginate'

const TenantSiteTable = ({ availableSites, onReserve, sitesPerPage }) => {
	const [pageNumber, setPageNumber] = useState(0)

	const pagesVisited = pageNumber * sitesPerPage
	const pageCount = Math.ceil(availableSites.length / sitesPerPage)
	const changePage = ({ selected }) => {
		setPageNumber(selected)
	}

	return (
		<>
			<table className='table-auto'>
				<thead>
					<tr>
						<th className='py-3 pr-16'>Site #</th>
						<th className='py-3 pr-16'>Amps</th>
						<th className='py-3 pr-16'>Type</th>
						<th className='py-3 pr-16'>Rate</th>
					</tr>
				</thead>
				<tbody>
					{availableSites.slice(pagesVisited, pagesVisited + sitesPerPage).map((site) => (
						<tr key={site._id}>
							<td className='py-3 pr-16'>{site.roomNumber}</td>
							<td className='py-3 pr-16'>{site.amps} Amps</td>
							<td className='py-3 pr-16'>{site.type}</td>
							<td className='py-3 pr-16'>${site.rate}/night</td>
							<td>
								<Button onClick={() => onReserve(site._id)}>Reserve</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='m-20 '>
				<ReactPaginate
					previousLabel={'Prev'}
					nextLabel={'Next'}
					pageCount={pageCount}
					onPageChange={changePage}
					containerClassName={'paginationBttns'}
					previousLinkClassName={'previousBttn'}
					nextLinkClassName={'nextBttn'}
					disabledClassName={'paginationDisabled'}
					activeClassName={'paginationActive'}
				/>
			</div>
		</>
	)
}

export default TenantSiteTable
