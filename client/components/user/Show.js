import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import requireAuth from '../../utils/requireAuth'
import {setCurrentUser, getCurrentUser, deleteCurrentUser, logout} from '../../redux/actions/auth'
import {addFlashMessage} from '../../redux/actions/flashMessages'
import RC2 from 'react-chartjs2'
import dog from '../../images/default/dog.jpg'
import DeletePrompt from './partials/DeletePrompt'

class Show extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      create_date: '',
      thumbnail_url: '',
      highest_level: '',
      total_win: '',
      total_lose: '',
      activity_log: '',
      total_win_ratio: '',
      total_lose_ratio: '',
      total_game_play: '',
      openPrompt: false
    };

    this.handleOpenPrompt = this.handleOpenPrompt.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
  }

  callFlashMessage(){
    this.props.addFlashMessage({
      type: 'error',
      text: 'Failed to load profile information. Please try at another time.'
    });    
  }

  formatCreateDate(str){
    let d = new Date(str);
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    // monthes need to be incremented because its range is 0-11
    return (++month) + '/' + day + '/' + year;
  } 

  // formatStats(win, lose){
  //   let total_game_play = win + lose;
  //   let total_win_ratio = Math.round((win / total_game_play) * 100);
  //   let total_lose_ratio = Math.round((lose / total_game_play) * 100);
  //   return {total_game_play, total_win_ratio, total_lose_ratio};
  // }

  formatLogDate(str){
    return str.replace(/_/g, '/').replace(/\d{4}/, '') + str.substr(str.length - 2);
  }

  formatActivityLogs(activityLogObj){
    let activity_log = this.attachInactiveLogs(activityLogObj);
    
    for(let date in activityLogObj){
      activity_log.push(this.createNewLogEntry(
        this.formatLogDate(date), 
        activityLogObj[date].game_play,
        activityLogObj[date].win,
        activityLogObj[date].lose,
      ));
    }

    return {
      activity_log: activity_log.sort((a, b) => new Date(b.date) - new Date(a.date) < 0).slice(-7)
    };
  }

  populateDoughnutChart(){
    let win = this.state.total_win;
    let lose = this.state.total_lose;
    let hasPlayed = true;
    if(win === 0 && lose === 0) {
      win = 1;
      hasPlayed = false;
    }

    let chartData = {
      labels: ['Total Win', 'Total Lose'],
      datasets: [
        {
          data: [win, lose],
          backgroundColor: ['#bdec8e', '#ff8d6c'],
          // hoverBackgroundColor: []
        }]
    };

    let chartOptions = {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        enabled: hasPlayed
      }
    };

    return <RC2 ref='doughnutChart' data={chartData} options={chartOptions} type='doughnut'/>;    
  }

  attachInactiveLogs(activityLogObj){
    let inactive_dates = [];
    let currentDate = new Date();

    for(let date in activityLogObj){
      recursivelyAttachLogs.call(this, date);
    }

    return inactive_dates;

    function recursivelyAttachLogs(date){
      let nextDate = new Date();
      let nextDateStr = '';
      let parts = date.split('_');
      nextDate.setFullYear(parts[2], parts[0]-1, parts[1]); // year, month (0-based), day
      nextDate.setTime(nextDate.getTime() + 86400000);
      nextDateStr = `${nextDate.getMonth()+1}_${nextDate.getDate()}_${nextDate.getFullYear()}`;

      // if next date is not passing current moment and is not in activity log, keep attaching
      if(activityLogObj[nextDateStr] === undefined && currentDate - nextDate >= 0){
        // attach date to array and iterate again
        inactive_dates.push(this.createNewLogEntry(this.formatLogDate(nextDateStr)));
        return recursivelyAttachLogs(nextDateStr);
      }
    }
  }

  createNewLogEntry(date, game_play=0, win=0, lose=0){
    return {date, game_play, win, lose};
  }

  populateActivityLogs(){
    if(!this.state.activity_log) return;
    let chartData = this.setChartData(this.state.activity_log);
    let chartOptions = this.setChartOptions(this.state.activity_log);
    return <RC2 ref='lineChart' data={chartData} options={chartOptions} type='line'/>;    
  }
    
  setChartData(activity_log){
    let data = {
      labels: [],
      datasets: [
        {
          label: 'Game Play',
          // Set to 0 to draw straightlines
          lineTension: 0,
          // color below line
          backgroundColor: 'rgba(101,187,205,0.2)',
          // line configs
          borderWidth: 2,
          borderColor: 'rgba(75,192,192,1)',
          // point configs
          pointBorderWidth: 1,
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointRadius: 5,
          pointHitRadius: 20,
          // point hover configs
          pointHoverBorderColor: '#fff',
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverRadius: 6,
          // data points
          data: []
        }
      ]
    };

    activity_log.forEach((curr) => {
      data.labels.push(curr.date);
      data.datasets[0].data.push(curr.game_play);
    });
    
    return data;
  }

  setChartOptions(activity_log){
    return {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          afterBody: (tooltipItem, data) => {
            // add win and lose info after body text
            let date = tooltipItem[0].xLabel;
            let {win, lose} = activity_log.find(curr => curr.date === date);
            return `Win: ${win} \n Lose: ${lose}`;
          }
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    };
  }

  handleOpenPrompt(e){
    this.setState({openPrompt: true});
  }

  handleDeleteUser(){
    this.props.deleteCurrentUser(this.props.auth.user._id)
      .then(() => {
        this.props.logout();
        this.props.addFlashMessage({
          type: 'success',
          text: 'Goodbye. Have a nice rest of your life.'
        });
      })
      .catch(err => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Server is currently down. Please try at another time.'
        });
      });
  }

  handleDeleteCancel(){
    this.setState({openPrompt: false});
  }

  componentWillMount(){
    if(this.props.auth.isAuthenticated){
      this.props.getCurrentUser(this.props.auth.user._id)
        .then(({data}) => {
          if(!data) this.callFlashMessage();
          if(!data.thumbnail_url) data.thumbnail_url = dog;
          this.setState(
            Object.assign({}, data, this.formatActivityLogs(data.activity_log)) //, this.formatStats(data.total_win, data.total_lose))
          );
        })
        .catch(err => {
          this.callFlashMessage();
        });
    }
  }

  componentDidMount(){
    // can update chart here
    // https://github.com/topdmc/react-chartjs2
    // http://topdmc.github.io/react-chartjs2/
  }

  render(){
    return (
      <div className='show'>
        {this.state.openPrompt && <DeletePrompt handleDeleteUser={this.handleDeleteUser} handleDeleteCancel={this.handleDeleteCancel}/>}
        <h1>Profile</h1>
        <hr/>
        <div className="row user-info">
          <div className="user-info-img col col-xs-6">
            <img src={this.state.thumbnail_url} alt="pic"/>
          </div>
          <div className="user-info-doughnut-chart col col-xs-6">
            {this.populateDoughnutChart()}
            <p>Lv: {this.state.highest_level}</p>
          </div>
          <div className="user-info-desc col col-xs-12">
            <p>Username: {this.state.username}</p>
            <p>Joined on: {this.formatCreateDate(this.state.create_date)}</p>
            {/*<p>Total Game Play: {this.state.total_game_play}</p>*/}
            {/*<p>Total Win Ratio: {this.state.total_win_ratio}%</p>*/}
            {/*<p>Total Lose Ratio: {this.state.total_lose_ratio}%</p>*/}
          </div>
        </div>        
        <hr/>
        <div className="user-graph">
          <p>Activity Log:</p>
          <div className="user-activity-logs">
            {this.populateActivityLogs()}
          </div>
        </div>
        <hr/>
        <div className='flash-btn-group'>
          {/*
            TODO: Enable edit feature
            <Link to='/user/edit'>
              <button className='btn btn-lg flash-btn flash-bg-green flash-co-cream'>
                EDIT
              </button>
            </Link>
          */}
          <button className='btn btn-lg flash-btn flash-bg-red flash-co-cream'
            onClick={this.handleOpenPrompt}
          >DELETE ACCOUNT</button>
        </div>     
      </div>
    );
  }
}

Show.propTypes = {
  setCurrentUser: React.PropTypes.func.isRequired,
  getCurrentUser: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  deleteCurrentUser: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}

export default requireAuth(
  connect(mapStateToProps, {setCurrentUser, getCurrentUser, addFlashMessage, deleteCurrentUser, logout})(Show)
)