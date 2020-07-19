import React from 'react';
import youtube from '../apis/youtube';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Loading from './Loading';
import './App.css';

const KEY = 'AIzaSyAOGsOGCZoAsc3NgzngEz9lUSHRS7Jjbgw';

class App extends React.Component {
    state={ videos: [],
            selectedVideo: null
        };

    componentDidMount(){
        this.onTermSubmit('building');
    }

    onTermSubmit = async term =>{
        const response = await youtube.get('/search', {
            params: {
                q: term,
                part: 'snippet',
                maxResults: 5,
                type: 'video',
                key: `${KEY}`
            }
        });
        this.setState({ 
            videos: response.data.items,
            selectedVideo: response.data.items[0]
         }); 
    };

    currentVideo = (video) => {
        this.setState({ currentVideo: video });
    }

    render(){
        return <div className="ui container">
            <SearchBar onTermSubmit={this.onTermSubmit}/>
            <div id="videos" className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={this.state.currentVideo}/>
                    </div>
                    <div className="five wide column">
                        <VideoList videos={this.state.videos} onVideoSelect={this.currentVideo}/>
                    </div>
                </div>
            </div>
            
        </div>
    }
}

export default App;