class Ajax {
    async getData() {
        try {
            const res = await axios.get("./data.json");
            return res.data;
        } catch(e) {
            console.log(e);
        }
    }
}