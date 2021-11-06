import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class User extends Component {
    constructor(props){
        super(props)
        this.clickDelete=this.clickDelete.bind(this)
    }

    clickDelete(){
        this.props.userDelete(this.props.user.id)
    }

    render() {
        const {id,email,first_name,last_name,avatar} = this.props.user;
        return (
            <div className="col-xl-3 col-md-4 col-sm-6 mt-3">
                <Link className="card" to={`user/${id}`}>
                        <img src={avatar} alt="" className="img-fluid" />
                         <div className="card-body">
                            <h6 className="card-title">{first_name+" "+last_name}</h6>
                            <p className="card-text text-p">{email}</p>
                        </div>
                </Link>
                <button onClick={this.clickDelete} className="sil-btn" ><i className="fas fa-trash"></i></button>
            </div>
        )
    }
}

export default User
