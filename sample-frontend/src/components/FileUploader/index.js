import { useRef } from "react";
import Grid from "@mui/material/Grid";
import SampleButton from "components/SampleButton";
import PropTypes from "prop-types";

export const FileUploader = ({ handleFile }) => {
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <SampleButton color="secondary" rel="noreferrer" variant="gradient" onClick={handleClick}>
          Upload a file
        </SampleButton>
        <input
          type="file"
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: "none" }} // Make the file input element invisible
        />
      </Grid>
    </>
  );
};

FileUploader.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "white",
  circular: false,
  iconOnly: false,
};

FileUploader.propTypes = {
  handleFile: PropTypes.func.isRequired,
};
