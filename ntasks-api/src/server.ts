import App from "./app.js";
import config from "./configs/config.js";

const PORT = config.PORT;

App.listen(PORT, () => {
    console.log(`Server Listening on PORT ${PORT}`);
});

export default App;
