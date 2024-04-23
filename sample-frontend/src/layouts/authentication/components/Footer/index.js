/**
=========================================================
* sample React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// sample React components
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";

// sample React base styles
import typography from "assets/theme/base/typography";

function Footer({ light }) {
  const { size } = typography;

  return (
    <SampleBox position="absolute" width="100%" bottom={0} py={4}>
      <Container>
        <SampleBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <SampleBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "white" : "text"}
            fontSize={size.sm}
          >
            &copy; {new Date().getFullYear()}, made with
            <SampleBox fontSize={size.md} color={light ? "white" : "dark"} mb={-0.5} mx={0.25}>
              <Icon color="inherit" fontSize="inherit">
                favorite
              </Icon>
            </SampleBox>
            by
            <Link href="https://www.creative-tim.com/" target="_blank">
              <SampleTypography
                variant="button"
                fontWeight="medium"
                color={light ? "white" : "dark"}
              >
                &nbsp;Creative Tim&nbsp;
              </SampleTypography>
            </Link>
            for a better web.
          </SampleBox>
          <SampleBox
            component="ul"
            sx={({ breakpoints }) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
            <SampleBox component="li" pr={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/" target="_blank">
                <SampleTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Creative Tim
                </SampleTypography>
              </Link>
            </SampleBox>
            <SampleBox component="li" px={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/presentation" target="_blank">
                <SampleTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  About Us
                </SampleTypography>
              </Link>
            </SampleBox>
            <SampleBox component="li" px={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/blog" target="_blank">
                <SampleTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Blog
                </SampleTypography>
              </Link>
            </SampleBox>
            <SampleBox component="li" pl={2} lineHeight={1}>
              <Link href="https://www.creative-tim.com/license" target="_blank">
                <SampleTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  License
                </SampleTypography>
              </Link>
            </SampleBox>
          </SampleBox>
        </SampleBox>
      </Container>
    </SampleBox>
  );
}

// Setting default props for the Footer
Footer.defaultProps = {
  light: false,
};

// Typechecking props for the Footer
Footer.propTypes = {
  light: PropTypes.bool,
};

export default Footer;
