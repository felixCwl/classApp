import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  //const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <SampleBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <SampleTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </SampleTypography>
        </Link>
      </SampleBox>
    ));

  return (
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
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}
      </SampleBox>
      {/* <SampleBox
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
        {renderLinks()}
      </SampleBox> */}
    </SampleBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  links: [
    { href: "http://localhost:3000/", name: "About Us" },
    { href: "http://localhost:3000/", name: "Blog" },
    { href: "http://localhost:3000/", name: "License" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
