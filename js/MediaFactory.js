class MediaFactory {
	createMedia(type) {
		let media;
		if (type === 'image') {
			media = new Image();
		} else if (type === 'video') {
			media = new Video();
		}
		return media;
	}
}
