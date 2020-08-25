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
	clearFiles();
	let fileStorage = document.getElementById('fileStorage');
	fileStorage.setAttribute('id', "fileStorage");
	firebase
		.storage()
		.ref()
		.listAll().then( 
			(list) => {
				for (i in list.items) {
					let fileItem = document.createElement('div'),
						iconRemove = document.createElement('span'),
						iconDownload = document.createElement('i'),
						iconOpen = document.createElement('span'),
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

					iconOpen.innerText = 'open_in_new';
					iconOpen.classList.add('material-icons');
					iconOpen.classList.add('icons');
					iconOpen.style.color = "blue";
					iconOpen.setAttribute('onclick', "readFile(this)");

					fileItem.innerText = path;
					fileItem.setAttribute('id', path);

					fileStorage.append(fileItem);
					fileItem.append(iconRemove);
					fileItem.append(iconDownload);
					fileItem.append(iconOpen);

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
			  	getFiles();
			}).catch(function(error) {
				console.log(error);
			});
}	

function downloadFile(obj) {
	let path = obj.parentNode.id,
		link = document.createElement("a");
	firebase
		.storage()
		.ref()
		.child(path)
		.getDownloadURL()
			.then(function (url) {
			    if (link.download !== undefined) {
			        link.setAttribute("href", url);
			        link.setAttribute("target", "_blank");
			        link.style.visibility = 'hidden';
			        document.body.appendChild(link);
			        link.click();
			        document.body.removeChild(link);
			    }
			})
}

function clearFiles() {
	let fileStorage = document.getElementById("fileStorage");
	while (fileStorage.firstChild) {
	    fileStorage.removeChild(fileStorage.firstChild);
	}
}

function readFile(obj) {
	
}