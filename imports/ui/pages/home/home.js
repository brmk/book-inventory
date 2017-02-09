import './home.html';

Template.home.onRendered(function(){

	var rtmpStreamer = new RtmpStreamer();
	
    console.log(rtmpStreamer)
    var getUrl = function () {
        return document.getElementById('url').value;
    };

    var getName = function () {
        return document.getElementById('stream-name').value;
    };

    var streamer = new rtmpStreamer(document.getElementById('rtmp-streamer'));
    var player = new rtmpStreamer(document.getElementById('rtmp-player'));

    document.getElementById("play").addEventListener("click", function () {
        player.play(getUrl(), getName());
    });

    document.getElementById("publish").addEventListener("click", function () {
        streamer.publish(getUrl(), getName());
    });

    document.getElementById("streamer-disconnect").addEventListener("click", function () {
        streamer.disconnect();
    });

    document.getElementById("player-disconnect").addEventListener("click", function () {
        player.disconnect();
    });

	

});