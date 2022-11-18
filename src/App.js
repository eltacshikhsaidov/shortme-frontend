import { Url } from "./components/Url";
import "./styles.css";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Info } from "@mui/icons-material";

export default function App() {
  return (
    <div className="App">
      <h1 className="sha564">
        URL shortener
        <Tooltip
          placement="top"
          title="Every URL will be removed after 4 hours"
        >
          <IconButton>
            <Info color="primary" />
          </IconButton>
        </Tooltip>
      </h1>
      <Url />
    </div>
  );
}
