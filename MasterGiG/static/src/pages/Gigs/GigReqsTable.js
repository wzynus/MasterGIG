import React from 'react'
import {Table, Button } from 'semantic-ui-react'

class GigReqsTable extends React.Component {

    handleClick = (event) => {
        const gigToUpdate = {
            id: event.target.id,
            status: event.target.value
        }
        this.props.update(gigToUpdate)
    }

    parseRow = (req) => {
        return (
            <Table.Row>
                <Table.Cell>{req.created_at}</Table.Cell>
                <Table.Cell>{req.date}</Table.Cell>
                <Table.Cell>{req.start_time} - {req.end_time}</Table.Cell>
                <Table.Cell>{req.location}</Table.Cell>
                <Table.Cell>{req.client_name}: {req.client_email} {req.client_phone}</Table.Cell>
                <Table.Cell>
                    <Button color="black" id={req.id} value="accepted" onClick={this.handleClick}>Accept</Button> or 
                    <Button color="black" id={req.id} value="declined" onClick={this.handleClick}>Decline</Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    render(){
        return (
            <Table width={10} celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Date Requested</Table.HeaderCell>
                    <Table.HeaderCell>Gig Date</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                    <Table.HeaderCell>Location</Table.HeaderCell>
                    <Table.HeaderCell>Client Info</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.reqs.map(req => {
                        return this.parseRow(req);
                    })}
                </Table.Body>
            </Table>
        )
    }
}

export default GigReqsTable