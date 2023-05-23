export const GameLayout = `
<div class="dashboard-container">
    <div class="dashboard">
        <div id="setting-icon">
            <a><img src="./assets/settings.png"></a>
        </div>
        <div id="high_score-icon">
            HS
        </div>
        <div id="feedback-icon">
            Feedback
        </div>
        <div class="main-dashboard">
            <div id="title">
                Pong Pong
            </div>
            <ul>
                <li><img src="./assets/bot.png">vs Henry</li>
                <li><img src="./assets/multiplayer.png">vs Friends</li>
            </ul>
        </div>
    </div>
    <div class="setting-container">
        <div class="back-button" id="back-settings">
            <button>Back</button>
        </div>
        <div class="settings"> 
            <div id="title">
                Settings
            </div>
            <table>
                <tr>
                <td>Player1 Name</td>
                <td><input placeholder="Player 1"></td>
                </tr>
                <tr>
                <td>Player2 Name</td>
                <td><input placeholder="Player 2"></td>
                </tr>
                <tr>
                    <td> Best Of  (in progress) </td>
                    <td>
                        <input type="radio" value="1" id="one" name="bestOf">
                        <label for="one">1</label> 
                        <input type="radio" value="3" id="three" name="bestOf">
                        <label for="three">3</label>
                        <input type="radio" value="5" id="five" name="bestOf">
                        <label for="five">5</label>
                    </td>
                </tr>
                <tr>
                    <td>Game At</td>
                    <td>
                        <input type="radio" value="6" id="sixPoints" name="gameAt">
                        <label for="sixPoints">6</label> 
                        <input type="radio" value="11" id="elevenPoints" name="gameAt">
                        <label for="elevenPoints">11</label>
                        <input type="radio" value="21" id="twentyOnePoints" name="gameAt">
                        <label for="twentyOnePoints">21</label>
                    </td>    
                </tr>
                <tr>
                    <td>Serve Change At</td>
                    <td>
                        <input type="radio" value="2" id="twoServe" name="serveChangeAt">
                        <label for="twoServe">2</label> 
                        <input type="radio" value="5" id="fiveServe" name="serveChangeAt">
                        <label for="fiveServe">5</label>
                    </td>
                </tr>
            </table>
            <button>Save</button>
        </div>
    </div> 
    <div class="highscore-container">
        <div class="back-button" id="back-high-score">
            <button>Back</button>
        </div>
        <div class="high-score">
            <div id="title">
                High Score
            </div>
            <table id="high-score-data">
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                    <th>Opponent</th>
                </tr>
            </table>
        </div>
    </div>
    <div class="feedback-container">
        <div class="back-button" id="back-feedback">
            <button>Back</button>
        </div>
        <div id="title">
            Feedback
        </div>
        <div class="feedback">
            <div class="feedback-form">
                <label class="form-label" for="name">Name</label> <br/>
                <input class="form-input" type="text" id="feedback-name" name="name" placeholder="Your name.."><br/><br/>
                <label class="form-label" for="email">Email</label><br/>
                <input class="form-input" type="text" id="feedback-email" name="email" placeholder="Your email.."><br/><br/>
                <label class="form-label" for="subject">Feedback</label><br/>
                <textarea class="form-textarea" id="feedback-subject" name="subject" placeholder="Write something.." style="height:200px"></textarea><br/><br/>
                <input id="form-button" class="form-button" type="submit" value="Submit">
            </div>
        </div>
    </div>
</div>
<button class="quit-game">QUIT</button>
<div id="ping-pong-container">
</div>
<div class="postGameContainer">
    <span></span> Won!!!!! <br><br>
    <div id="play-again">
        <img src="./assets/replay.png"> Play again 
    </div>
</div>`