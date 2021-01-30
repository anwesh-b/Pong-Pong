export const GameLayout = `
<div class="dashboard-container">
    <div class="dashboard">
        <div id="setting-icon">
            <a><img src="./assets/settings.png"></a>
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
        <div id="back-settings">
            <button>Back</button>
        </div>
        <div class="settings"> 
            <div id="title">
                Settings
            </div>
            <table>
                <tr>
                <td>Player Name</td>
                <td><input placeholder="Player 1"></td>
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
                <tr>
                    <td>Stadium  (in progress)</td>
                    <td></td>
                </tr>
            </table>
            <button>Save</button>
        </div>
    </div>    
</div>
<div id="ping-pong-container"></div>
<div class="postGameContainer">
    <span></span> Won!!!!! <br><br>
    <div id="play-again">
        <img src="./assets/replay.png"> Play again 
    </div>
</div>`