import React, { Component } from 'react'
import axios from 'axios'

export class UserDetailsPage extends Component {
    constructor(props){
        super(props)
        this.duzenleAc=this.duzenleAc.bind(this)
        this.gizle=this.gizle.bind(this)
        this.kullaniciDuzenle=this.kullaniciDuzenle.bind(this)
        this.tekrarUpdate=this.tekrarUpdate.bind(this)
        this.state = {
            duzenle:0,
            sId:0,
            oldu:0,
            bos:0
        }
    }

    duzenleAc(){
        this.setState({duzenle:1})
    }

    gizle(e){
        e.preventDefault();
        this.setState({duzenle:0})
    }

    kullaniciDuzenle(e){
        e.preventDefault();
        var userx = {}
        if(e.target.first_name.value){
            userx = {first_name:e.target.first_name.value}
            if(e.target.last_name.value){
                userx = {
                    first_name:e.target.first_name.value,
                    last_name:e.target.last_name.value,
                }
                if(e.target.email.value){
                    userx = {
                        first_name:e.target.first_name.value,
                        last_name:e.target.last_name.value,
                        email:e.target.email.value
                    }
                }
            }
            else if(e.target.email.value){
                userx = {
                    first_name:e.target.first_name.value,
                    email:e.target.email.value
                }
            }
            this.tekrarUpdate(userx,e)
        }
        else if(e.target.last_name.value){
            userx = {
                last_name:e.target.last_name.value,
            }
            if(e.target.email.value){
                userx = {
                    last_name:e.target.last_name.value,
                    email:e.target.email.value
                }
            }
            this.tekrarUpdate(userx,e)

        }
        else if(e.target.email.value){
            userx = {
                email:e.target.email.value
            }
            this.tekrarUpdate(userx,e)
        }
        else {
            this.setState({
                bos:1
            })
            setTimeout(() => {
                this.setState({
                    bos:0
                })
            }, 2500);
        }
        
    }

    tekrarUpdate(userx,e){
        this.props.updateClick(this.state.sId,userx)
        this.setState({
            oldu:1
        })
        setTimeout(() => {
            this.setState({
                oldu:0
            })
        }, 2500);
        e.target.first_name.value=""
        e.target.last_name.value=""
        e.target.email.value=""
    }

    capitalizeFirstLetter(string) {
        let stt =string.slice(1);
        return string.charAt(0).toUpperCase() + stt.toLowerCase();
    }

    componentDidMount(){
        let duzId =window.location.pathname;
        let dizi = duzId.split("/");
        var lastItem = dizi.pop();
        console.log(lastItem)
        this.props.getOneUser(lastItem);
        this.setState({
            sId:lastItem
        })
        // this.setState({duzenle:0})
    }
    render() {
        const {id,first_name,last_name,avatar,email} = this.props.oneUser;
        return (
            <div>
                <div className="card-c container mt-4">
                    <div className="row">
                        <div className="card-body col-md-10">
                            <h5 className="card-title"><i className="fas fa-user mr-2"></i>{first_name+" "+last_name}</h5>
                            <p className="card-text email-yazi"><i className="fas fa-envelope mr-2"></i>{email}</p> 
                            <button onClick={this.duzenleAc} className="edit-icon"><i className="fas fa-user-edit"></i></button>
                        </div>
                        <div className="col-md-2">
                            <img src={avatar} alt="..." className="img-fluid detail-img"/>
                        </div>
                    </div> 
                </div>
                {this.state.duzenle==1 && <div className="container mt-5 duzenle-card">
                    <form onSubmit={this.kullaniciDuzenle}>
                        <span className="badge bg-dark text-light">ID: {id}</span>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-2 yazi-de">
                                        Name:
                                    </div>
                                    <div className="col-md-10">
                                        <input name="first_name" type="text" className="form-control" maxLength="10" />
                                    </div>
                                </div>   
                            </div>
                            <div className="col-md-12 mt-3">
                                <div className="row">
                                    <div className="col-md-2 yazi-de">
                                        SurName:
                                    </div>
                                    <div className="col-md-10">
                                        <input name="last_name" type="text" className="form-control" maxLength="10" />
                                    </div>
                                </div>   
                            </div>
                            <div className="col-md-12 mt-3">
                                <div className="row">
                                    <div className="col-md-2 yazi-de">
                                        E-mail: 
                                    </div>
                                    <div className="col-md-10">
                                        <input name="email" type="email" className="form-control" maxLength="29" />
                                    </div>
                                </div>   
                            </div>
                                {this.state.oldu==1 && <div className="alert alert-success mt-3 fulle">Kullanıcı Güncellendi</div> }
                                {this.state.bos==1 && <div className="alert alert-warning mt-3 fulle">Güncelleme Yapmadınız</div> }
                            <div className="col-md-12 mt-3">
                                <div className="row">
                                    <button type="submit" className="popup-submit btn-duz col-md-3 mx-2 my-2"> Düzenle</button>
                                    <button onClick={this.gizle} className="popup-submit btn-duz btn-gizle col-md-3 mx-2 my-2"> Gizle </button>
                                </div>   
                            </div>
                            

                        </div>   
                    </form>
                </div> }
            </div>
         
        )
    }
}

export default UserDetailsPage

