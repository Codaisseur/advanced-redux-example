import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadBatches } from '../actions/batches'
import { Paper, Table, TableBody, TableCell, TablePagination, TableRow, Typography, TableFooter } from '@material-ui/core'
import { Link } from 'react-router-dom'

class Batches extends Component {
  componentDidMount() {
    this.props.dispatch(loadBatches(0))
  }

  handleChangePage = (_event, page) => {
    this.props.dispatch(loadBatches(page))
  }

  render() {
    const {batches, pagination} = this.props
    if (!batches && pagination.fetching) return 'Loading...'
    if (pagination.page === null) return null

    return (
      <Paper style={{ margin: 32, padding: 16 }}>
        <Typography variant="display1">All Batches</Typography>

        <Table style={{ opacity: pagination.fetching ? 0.3 : 1 }}>
          <TableBody>
            {batches
              .map(batch => {
                return (
                  <TableRow key={batch.id}>
                    <TableCell numeric>{batch.id}</TableCell>
                    <TableCell><Link to={`/batches/${batch.id}`}>{batch.name}</Link></TableCell>
                  </TableRow>
                );
              })}
            {batches.length === 0 && (
              <TableRow>
                <TableCell colSpan={2}>No data</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={2}
                count={pagination.total}
                rowsPerPage={10}
                rowsPerPageOptions={[ 10 ]}
                page={pagination.page}
                onChangePage={this.handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  pagination: state.paginatedBatches,
  batches: state.paginatedBatches.ids && 
    state.paginatedBatches.ids.map(id => state.entities.batches[id])
})

export default connect(mapStateToProps)(Batches);
