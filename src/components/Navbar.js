import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

export class Navbar extends Component {

    constructor(props){
        super(props);
        this.kullaniciEkle=this.kullaniciEkle.bind(this);
        this.state={
            olusum:0
        }

    }
    
    kullaniciEkle(e){
        e.preventDefault()
        let hazirName = this.capitalizeFirstLetter(e.target.name.value);
        let hazirSurname = this.capitalizeFirstLetter(e.target.surname.value);
        let hazirEmail = e.target.email.value.toLowerCase()
        let user = {
            first_name: hazirName,
            last_name: hazirSurname,
            email: hazirEmail,
            avatar: "https://via.placeholder.com/150",
        }
        e.target.name.value="";
        e.target.surname.value="";
        e.target.email.value="";
        this.props.postClick(user)
        this.setState({
            olusum:1
        })
        setTimeout(() => {
            this.setState({
                olusum:0
            })
        }, 2500);
    }

    capitalizeFirstLetter(string) {
        let stt =string.slice(1);
        return string.charAt(0).toUpperCase() + stt.toLowerCase();
      }

    render() {
        return (
            <nav className="navbar navbar-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand deneme">
                        <i className="fas fa-project-diagram mr-4"></i>ReactJS CRUD
                    </Link>
                    <div className="popup-container">
                        <label htmlFor="popup-ekle" className="popup-button"><i className="fas fa-plus"></i></label>
                        <input type="checkbox" id="popup-ekle" className="gizle-me" />
                        <div className="popup">
                            <div className="inner">
                                <div className="popup-title">
                                    <h6>Yeni Kullanıcı Ekle</h6>
                                    <label htmlFor="popup-ekle"><i className="fas fa-times"></i></label>
                                </div>
                                <hr />
                                <div className="popup-body">
                                    <form onSubmit={this.kullaniciEkle}>
                                        <input name="name" type="text" className="form-control" placeholder="Name" maxLength="10" required/>
                                        <input name="surname" type="text" className="form-control mt-3" placeholder="Surname"  maxLength="10" required/>
                                        <input name="email"type="email" className="form-control mt-3" placeholder="E-mail" maxLength="29" required/>
                                        <div className="resim-sec mt-3">
                                            <label htmlFor="img">Select image: </label>
                                            <input type="file" id="img" name="img" className="ml-2" accept="image/*"/>
                                        </div>
                                        { this.state.olusum==1 && <p className="alert alert-success mt-3">Kullanıcı Oluşturuldu</p>}
                                        <button type="submit" className="popup-submit mt-3">Ekle</button>
                                    </form>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar
