import React from 'react';
import { Link } from 'react-router-dom'

import './style.css';
import panoramas from "./panoramas.json";
import API from './../../utils/API';
import withAuth from './../withAuth';



class Panoramas extends React.Component {
    state = {
        metricID: "",
        metrics: []
    }

    componentDidMount() {
        API.getUser(this.props.user.id).then(res => {
            this.setState({
                metricID: res.data.metric
            })
            let pageOn = this.props.history.location.pathname.replace("/", "")
            API.addToMetrics(res.data.metric, pageOn)
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {panoramas.map(image =>
                        <div className="col-md-4 panorama-style">
                            <Link to={"/Panoramas/" + image.name.toLowerCase()}>
                                <img className=" image-style" src={process.env.PUBLIC_URL + '/img/panoramaImages/' + image.path} alt="city" />
                            </Link>
                        </div>
                    )}
                </div>
                < button type="button" className="btn btn-success" >
                    <Link className="back-btn" to="/Look"> BACK </Link>
                </button >
            </div>
        )
    }
}

export default withAuth(Panoramas);