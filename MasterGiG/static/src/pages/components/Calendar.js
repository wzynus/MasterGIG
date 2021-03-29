import React from 'react'
import PublicGigsList from './PublicGigList'
import NoGigsMessage from './NoGigsMessage'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
BigCalendar.momentLocalizer(moment)
require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

class Calendar extends React.Component {
  constructor () {
    super()
    this.state = {
      publicGigs: []
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/gigs/public')
  //   .then(resp => resp.json())
  //   .then(gigs => this.setState({
  //     publicGigs: gigs
  //   }))
  // }


  render () {
    return (
      // <div>
      //     {this.state.publicGigs.length > 0 ? <PublicGigsList publicGigs={this.state.publicGigs}/> : <NoGigsMessage/>}
      // </div>
      <BigCalendar events={[]}>

      </BigCalendar>
    )
  }
}

  
export default Calendar