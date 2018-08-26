import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadBatch } from '../actions/batches'
import { Paper, Table, TableBody, TableCell, TablePagination, TableRow, Typography, TableFooter } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {loadStudents, addStudent} from '../actions/students'
import AddStudent from '../components/AddStudent'

class BatchPage extends Component {
  componentDidMount() {
    this.props.loadBatch(this.props.match.params.id)
    this.props.loadStudents(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.id !== this.props.match.params.id) {
      this.props.loadBatch(newProps.match.params.id)
      this.props.loadStudents(newProps.match.params.id)
    }
  }

  addStudent = (student) => {
    this.props.addStudent(student, this.props.match.params.id)
  }

  render() {
    const { batch, studentsFetching, students } = this.props
    if (!batch) return 'Loading...'

    return (
      <Paper style={{ margin: 32, padding: 16 }}>
        <Typography variant="display1">Batch {batch.name}</Typography>

        <Link to={`/batches/${batch.id+1}`}>Next batch</Link>

        <Typography variant="headline">Students in this batch</Typography>

        { studentsFetching && 'Loading students for this batch...' }

        { !studentsFetching && students && `${students.length} students found` }

        { !studentsFetching && students && <Table>
          <TableBody>
            {students
              .map(student => {
                return (
                  <TableRow key={student.id}>
                    <TableCell numeric>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                  </TableRow>
                );
              })}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={2}>No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table> }

        <AddStudent onSubmit={this.addStudent} />
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const studentsForBatch = state.studentsForBatch[props.match.params.id]
  return {
    batch: state.entities.batches[props.match.params.id],
    studentsFetching: studentsForBatch && studentsForBatch.fetching,
    students: studentsForBatch && studentsForBatch.ids.map(id => state.entities.students[id])
  }
}

export default connect(mapStateToProps, {loadStudents, loadBatch, addStudent})(BatchPage);
