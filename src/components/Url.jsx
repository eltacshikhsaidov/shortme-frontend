import { useState } from "react";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CopyToClipboard from "react-copy-to-clipboard";

export const Url = () => {
  const [sUrl, setSurl] = useState();
  const [short, setShort] = useState();

  const handleChange = (event) => {
    setSurl(event.target.value);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  const hanldeClick = () => {
    console.log("you clicked me");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: sUrl })
    };

    fetch("https://shortme-api.herokuapp.com/api/shortUrl", requestOptions)
      .then((response) => response.json())
      .then((data) => setShort(data.shortUrl));

    console.log(short);
    short === null
      ? Toast.fire({
          icon: "info",
          title: "Please enter url"
        })
      : Toast.fire({
          icon: "info",
          title: "Url shortened"
        });
  };

  const handleCopyButton = () => {
    console.log(short);

    short === null
      ? Toast.fire({
          icon: "error",
          title: "url is not valid"
        })
      : Toast.fire({
          icon: "success",
          title: "copied"
        });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "45ch", height: "7.5ch" }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={handleChange}
          id="outlined-basic"
          label="Type url"
          variant="outlined"
          className="input"
        />
        <Button onClick={hanldeClick} size="small" variant="contained">
          Short me
        </Button>
      </Box>

      {short != null ? (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "45ch", height: "7.5ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            disabled
            onChange={handleChange}
            id="outlined-basic"
            label={short}
            variant="outlined"
          />
          <Button onClick={handleCopyButton} size="small" variant="contained">
            <CopyToClipboard text={short}>
              <h4>Copy to clipboard</h4>
            </CopyToClipboard>
          </Button>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};
