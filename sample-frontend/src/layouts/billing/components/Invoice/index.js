// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

function Invoice({ date, id, price, noGutter }) {
  return (
    <SampleBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <SampleBox lineHeight={1.125}>
        <SampleTypography display="block" variant="button" fontWeight="medium">
          {date}
        </SampleTypography>
        <SampleTypography variant="caption" fontWeight="regular" color="text">
          {id}
        </SampleTypography>
      </SampleBox>
      <SampleBox display="flex" alignItems="center">
        <SampleTypography variant="button" fontWeight="regular" color="text">
          {price}
        </SampleTypography>
        <SampleBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          ml={3}
          sx={{ cursor: "pointer" }}
        >
          <Icon fontSize="small">picture_as_pdf</Icon>
          <SampleTypography variant="button" fontWeight="bold">
            &nbsp;PDF
          </SampleTypography>
        </SampleBox>
      </SampleBox>
    </SampleBox>
  );
}

// Setting default values for the props of Invoice
Invoice.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Invoice;
