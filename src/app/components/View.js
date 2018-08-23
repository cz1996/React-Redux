import React, { Component } from 'react'
import Buttonarea from './Buttonarea'
import Header from './Header'

class View extends Component{
    render(){
        return(
            <div>
                <Header />
                <Buttonarea />
            </div>
        )
    }
}

export default View