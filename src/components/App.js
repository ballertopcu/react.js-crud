import React, { Component } from 'react'
import Navbar from './Navbar'
import  Users from './Users'
import axios from 'axios'
import UserDetailsPage from './UserDetailsPage'
import NotFound from './NotFound'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export class App extends Component {
    constructor(props){
        super(props);
        this.postClick=this.postClick.bind(this);
        this.getOneUser=this.getOneUser.bind(this);
        this.updateClick=this.updateClick.bind(this);
        this.userDelete=this.userDelete.bind(this);
        this.state = {
            users:[],
            oneUser:{},

        }
    }
    componentDidMount(){
        axios
        .get('https://reqres.in/api/users')
        .then(res => this.setState({users:res.data.data}));
    }
    postClick(userData){
        axios({
            method: 'post',
            url: 'https://reqres.in/api/users',
            data: userData
          }).
          then(res => {
              console.log(res);
              this.setState((prevState) => ({users:prevState.users.concat([res.data])}))}
              )
    }
    updateClick(id,degisenUser){
        axios
        .put(`https://reqres.in/api/users/${id}`, {...degisenUser}
        )
        .then( res => {
            let upUsers = this.state.users.map(usr => {
                if(usr.id==id){
                    return {
                        ...usr,
                        ...res.data
                    }
                }
                else{
                    return{...usr}
                }
            })
            this.setState({
                users : upUsers,
                oneUser : upUsers.filter(yusr =>{
                    return yusr.id == id
                })[0]
            })
        }
                
        )
    }

    userDelete(id){
        axios
        .delete(`https://reqres.in/api/users/${id}`)
        .then(res => {
            let delDizi =this.state.users.filter(usr => {
                return usr.id != id
            })
            this.setState({
                users:delDizi
            })
        })

    }

    getOneUser(gelenUser){
       let ataUser = this.state.users.filter( user => user.id==gelenUser );
       this.setState({
           oneUser:ataUser[0]
       })
    }
 
    render() {
        return (
            <BrowserRouter>
                <Navbar postClick={this.postClick}/>
                <Routes>
                    <Route path="/" element={<Users users={this.state.users} userDelete={this.userDelete} />}/>
                    <Route path="user/:id" element={<UserDetailsPage updateClick={this.updateClick} getOneUser={this.getOneUser} oneUser={this.state.oneUser} />}/>
                    <Route element={<NotFound />} path="*" />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App
