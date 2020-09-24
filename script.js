const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable and Enable button
function toggleButton () {
	button.disabled = !button.disabled;
}
// Pass Joke to the VoiceRSS API
function tellMe (joke) {
	console.log('tellMe is running...', joke);
	VoiceRSS.speech({
		key: '',
		src: joke,
		hl: 'en-us',
		v: 'Linda',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	});
}
// Get jokes from Jokes api
async function getJokes () {
	let joke = '';
	const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup}... ${data.delivery}`;
		}
		else {
			joke = data.joke;
		}
		// Text to Speech
		tellMe(joke);

		// Disable Button
		toggleButton();
	} catch (error) {
		//catch errors
		console.log('whoops..getJokes API', error);
	}
}
// Event listeners for buttons
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
