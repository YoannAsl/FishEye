class Ajax {
	async getData() {
		try {
			const res = await axios.get('../assets/data.json');
			return res.data;
		} catch (e) {
			console.log(e);
		}
	}
}
