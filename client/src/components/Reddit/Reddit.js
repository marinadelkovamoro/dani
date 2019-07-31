import React, { Component } from 'react';
import Subreddits from "../Subreddits";
import Card from '../Card';
// import { createDecipher } from 'crypto';

const subs = [
    {
        name: "food",
        isChosen: true,
        icon: "https://cdn2.iconfinder.com/data/icons/maki/100/fast-food-512.png"
    },
    {
        name: "Pixar",
        isChosen: false,
        icon: "https://www.freeiconspng.com/uploads/video-camera-png-icon-14.png"
    },
    {
        name: "aww",
        isChosen: false,
        icon: "https://image.flaticon.com/icons/png/512/64/64431.png"
    },
    {
        name: "wallpaper",
        isChosen: false,
        icon: "https://image.flaticon.com/icons/png/512/254/254172.png"
    },
    {
        name: "travel",
        isChosen: false,
        icon: "https://image.flaticon.com/icons/png/128/45/45873.png"
    },
    {
        name: "pics",
        isChosen: false,
        icon:"https://www.stickpng.com/assets/images/584abf102912007028bd9332.png"
    }
]

class Reddit extends Component {

    constructor(props) {
        super(props);
        this.foodSubreddit = "food"
        this.pixarSubreddit = "Pixar"
        this.funnyReddit = "funny"

        this.url = 'https://www.reddit.com/r/';
        this.sorts = 'hot';
    }

    state = {
        subs,
        chosenSubreddit: 'food',
        sort: 'hot',
        files: [],
        after: null,
        before: null,
        page: 1
    };
   

    componentDidMount() {
        this.changeSubreddit(this.state.chosenSubreddit)
    }

    nextPage = () => {
        fetch(this.url + this.state.chosenSubreddit + "/" + this.state.sort + ".json?count=" + (this.state.page * 25) + "&after=" + this.state.after)
            .then(res => res.json())
            .then((data) => {
                this.setState(() => ({
                    files: data.data.children,
                    after: data.data.after,
                    before: data.data.before,
                    page: this.state.page + 1
                }))
             
            })
            .catch((err) => {
                console.log(err)
            })
    }


    previousPage = () => {
        fetch(this.url + this.state.chosenSubreddit + "/" + this.state.sort + ".json?count=" + (this.state.page * 25) + "&after=" + this.state.after)
            .then(res => res.json())
            .then((data) => {
                this.setState(() => ({
                    files: data.data.children,
                    after: data.data.after,
                    before: data.data.before,
                    page: this.state.page - 1
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }


    changeSubreddit = sub => {
        this.setState({
            files: [],
            chosenSubreddit: sub,
            page: 1
        });
        fetch(this.url + sub + "/" + this.state.sort + '.json')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    files: data.data.children,
                    after: data.data.after,
                    before: data.data.before
                });
                window.scrollTo(0, 0)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    render() {
        let nextButton = <button className="btn btn-primary nextButton" type="submit" onClick={this.nextPage}><i class="fas fa-arrow-right"></i></button>

        let previousButton;
        if(this.state.page > 1){
            previousButton = <button className="btn btn-primary previousButton" type="submit" onClick={this.previousPage}><i class="fas fa-arrow-left"></i></button>
        }
        else if(this.state.page <= 1){
            previousButton = ""
        }
        
        return (
            <div>
                <div className='row'>
                    {this.state.subs.map(sub => (

                        <Subreddits
                            changeSubreddit={() => this.changeSubreddit(sub.name)}
                            name={sub.name}
                            key={sub.name}
                            icon={sub.icon}
                        />

                    ))}
                </div>
                <div className='row'>
                    {this.state.files.map(file => (
                        <Card
                            file={file}
                            image={file.image}
                            title={file.data.title}
                            key={file.data.id}
                        />
                    ))}
                </div>
                <footer class="subFooter">
                {previousButton}
                {nextButton}
                </footer>
           
            </div>

        )
    }
}






export default Reddit;
