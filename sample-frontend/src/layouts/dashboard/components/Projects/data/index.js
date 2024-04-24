// @mui material components
import Tooltip from "@mui/material/Tooltip";
import SampleBox from "components/SampleBox";
import SampleTypography from "components/SampleTypography";
import SampleAvatar from "components/SampleAvatar";
import SampleProgress from "components/SampleProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SampleAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <SampleBox display="flex" alignItems="center" lineHeight={1}>
      <SampleAvatar src={image} name={name} size="sm" />
      <SampleTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </SampleTypography>
    </SampleBox>
  );

  return {
    columns: [
      { Header: "companies", accessor: "companies", width: "45%", align: "left" },
      { Header: "members", accessor: "members", width: "10%", align: "left" },
      { Header: "budget", accessor: "budget", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
    ],

    rows: [
      {
        companies: <Company image={logoXD} name="Material UI XD Version" />,
        members: (
          <SampleBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team2, "Romina Hadid"],
              [team3, "Alexander Smith"],
              [team4, "Jessica Doe"],
            ])}
          </SampleBox>
        ),
        budget: (
          <SampleTypography variant="caption" color="text" fontWeight="medium">
            $14,000
          </SampleTypography>
        ),
        completion: (
          <SampleBox width="8rem" textAlign="left">
            <SampleProgress value={60} color="info" variant="gradient" label={false} />
          </SampleBox>
        ),
      },
      {
        companies: <Company image={logoAtlassian} name="Add Progress Track" />,
        members: (
          <SampleBox display="flex" py={1}>
            {avatars([
              [team2, "Romina Hadid"],
              [team4, "Jessica Doe"],
            ])}
          </SampleBox>
        ),
        budget: (
          <SampleTypography variant="caption" color="text" fontWeight="medium">
            $3,000
          </SampleTypography>
        ),
        completion: (
          <SampleBox width="8rem" textAlign="left">
            <SampleProgress value={10} color="info" variant="gradient" label={false} />
          </SampleBox>
        ),
      },
      {
        companies: <Company image={logoSlack} name="Fix Platform Errors" />,
        members: (
          <SampleBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team3, "Alexander Smith"],
            ])}
          </SampleBox>
        ),
        budget: (
          <SampleTypography variant="caption" color="text" fontWeight="medium">
            Not set
          </SampleTypography>
        ),
        completion: (
          <SampleBox width="8rem" textAlign="left">
            <SampleProgress value={100} color="success" variant="gradient" label={false} />
          </SampleBox>
        ),
      },
      {
        companies: <Company image={logoSpotify} name="Launch our Mobile App" />,
        members: (
          <SampleBox display="flex" py={1}>
            {avatars([
              [team4, "Jessica Doe"],
              [team3, "Alexander Smith"],
              [team2, "Romina Hadid"],
              [team1, "Ryan Tompson"],
            ])}
          </SampleBox>
        ),
        budget: (
          <SampleTypography variant="caption" color="text" fontWeight="medium">
            $20,500
          </SampleTypography>
        ),
        completion: (
          <SampleBox width="8rem" textAlign="left">
            <SampleProgress value={100} color="success" variant="gradient" label={false} />
          </SampleBox>
        ),
      },
      {
        companies: <Company image={logoJira} name="Add the New Pricing Page" />,
        members: (
          <SampleBox display="flex" py={1}>
            {avatars([[team4, "Jessica Doe"]])}
          </SampleBox>
        ),
        budget: (
          <SampleTypography variant="caption" color="text" fontWeight="medium">
            $500
          </SampleTypography>
        ),
        completion: (
          <SampleBox width="8rem" textAlign="left">
            <SampleProgress value={25} color="info" variant="gradient" label={false} />
          </SampleBox>
        ),
      },
      {
        companies: <Company image={logoInvesion} name="Redesign New Online Shop" />,
        members: (
          <SampleBox display="flex" py={1}>
            {avatars([
              [team1, "Ryan Tompson"],
              [team4, "Jessica Doe"],
            ])}
          </SampleBox>
        ),
        budget: (
          <SampleTypography variant="caption" color="text" fontWeight="medium">
            $2,000
          </SampleTypography>
        ),
        completion: (
          <SampleBox width="8rem" textAlign="left">
            <SampleProgress value={40} color="info" variant="gradient" label={false} />
          </SampleBox>
        ),
      },
    ],
  };
}

// Add prop validation for the "Company" component
Company.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
