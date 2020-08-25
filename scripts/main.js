function pickFiles() {
	let files = document.getElementById('inputFiles').files,
		filesLength = files.length;
	for (i=0; i<filesLength; i++) {
		let fileName = files[i].name,
			file = files[i];
		uploadFiles(file, fileName);
		
	}
}

function uploadFiles(file, fileName) {
	let storageRef = firebase.storage().ref(fileName),
		task = storageRef.put(file);
	task.on('state_changed', function progress(snapshot) {
		// loader
		}, function error(err) {
			console.log(err);
		}, function complete() {
			alert("Файл загружен");
			// delete loader
		}
	);
}

function getFiles() {
	let fileStorage = document.getElementById('fileStorage');
	fileStorage.setAttribute('id', "fileStorage");
	firebase
		.storage()
		.ref()
		.listAll().then( 
			function (list) {
				for (i in list.items) {
					let fileItem = document.createElement('div'),
						iconRemove = document.createElement('span'),
						iconDownload = document.createElement('i'),
						path = list.items[i].location.path_;

					iconRemove.innerText = 'delete';
					iconRemove.classList.add('material-icons');
					iconRemove.classList.add('icons');
					iconRemove.style.color = "red";
					iconRemove.setAttribute('onclick', "removeFile(this)");
					
					iconDownload.innerText = 'get_app';
					iconDownload.classList.add('material-icons');
					iconDownload.classList.add('icons');
					iconDownload.style.color = "green";
					iconDownload.setAttribute('onclick', "downloadFile(this)");

					fileItem.innerText = path;
					fileItem.setAttribute('id', path);

					fileStorage.append(fileItem);
					fileItem.append(iconRemove);
					fileItem.append(iconDownload);

					// loader
				}
			}, function error(err) {
				console.log(err);
			}, function complete() {
				// delete loader
				console.log('successfully');
			}
		)
}

function removeFile(obj) {
	let id = obj.parentNode.id;
	firebase
		.storage()
		.ref()
		.child(id)
		.delete().then(
			function() {
			  	console.log('successfully');
			}).catch(function(error) {
				console.log(error);
			});
}	

function downloadFile(obj) {
	let id = obj.parentNode.id;
	firebase
		.storage()
		.ref()
		.child(id)
		.getDownloadURL().then(
			function(url) {
			  	var xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.onload = function(event) {
					var blob = xhr.response;
				};
				xhr.open('GET', url);
			    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
			    xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
				xhr.send();

			}).catch(function(error) {
				console.log(error);
			});
}

function signinGmail() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  	var token = result.credential.accessToken;
	  	var user = result.user;
	  	console.log(result);
	}).catch(function(error) {
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	  	var email = error.email;
	  	var credential = error.credential;
	});
}

// function signinGithub() {
// 	var provider = new firebase.auth.GithubAuthProvider();
// 	firebase.auth().signInWithPopup(provider).then(function(result) {
// 	  	var token = result.credential.accessToken;
// 	  	var user = result.user;
// 	  	console.log(result);
// 	}).catch(function(error) {
// 	  	var errorCode = error.code;
// 	  	var errorMessage = error.message;
// 	  	var email = error.email;
// 	  	var credential = error.credential;
// 	});
// }