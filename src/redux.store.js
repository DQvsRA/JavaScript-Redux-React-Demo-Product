let state = {}

const output = `
	Initial State:<br>
	<pre>${JSON.stringify(state, null, 4)}</pre>
	<hr>
`
const app = require("express")()
app.get("/", (res, req) => req.send(output))
app.listen(3003, () => { console.log("App is running - OK") })