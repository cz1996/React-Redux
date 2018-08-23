import React, { Component } from 'react'
import { connect } from 'react-redux'
import './components.css'

class Header extends Component{
    render(){
        return(
            <div className="header" style={{color:this.props.color}}>
                这里是Header部分
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        color: state.color
    }
}

Header = connect(mapStateToProps)(Header)

export default Header