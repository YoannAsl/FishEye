const test = fetch("./data.json")
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data.photographers[0])
    })
    .catch(e => {
        console.log("error", e)
    })